import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SnakeSegment } from '../types';
import { useGameSound } from '../hooks/useSound';

interface Props {
  onScore: (points: number) => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREASE = 10;
const MIN_SPEED = 50;

const FRUITS = ['🥭', '🍌', '🥝', '🍊', '🥑'];
const POINTS_PER_FRUIT = 0.001;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

export const SnakeGame: React.FC<Props> = ({ onScore }) => {
  const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<keyof typeof DIRECTIONS>('RIGHT');
  const [fruit, setFruit] = useState<SnakeSegment & { type: string }>({ x: 15, y: 15, type: '🥭' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const playSound = useGameSound();

  const generateFruit = useCallback(() => {
    let newFruit: SnakeSegment & { type: string };
    do {
      newFruit = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
        type: FRUITS[Math.floor(Math.random() * FRUITS.length)]
      };
    } while (snake.some(segment => segment.x === newFruit.x && segment.y === newFruit.y));
    setFruit(newFruit);
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setSpeed(INITIAL_SPEED);
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    setGameOver(false);
    generateFruit();
    setIsPlaying(true);
    playSound('click');
  }, [generateFruit, score, highScore, playSound]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying || gameOver) return;

    const newDirection = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT'
    }[e.key] as keyof typeof DIRECTIONS;

    if (newDirection) {
      const currentDir = DIRECTIONS[direction];
      const newDir = DIRECTIONS[newDirection];
      
      if (!(currentDir.x === -newDir.x && currentDir.y === -newDir.y)) {
        setDirection(newDirection);
      }
    }
  }, [isPlaying, gameOver, direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        const dir = DIRECTIONS[direction];

        head.x += dir.x;
        head.y += dir.y;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          playSound('lose');
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          setIsPlaying(false);
          playSound('lose');
          return prevSnake;
        }

        const newSnake = [head];
        if (head.x === fruit.x && head.y === fruit.y) {
          generateFruit();
          setScore(s => s + 1);
          onScore(POINTS_PER_FRUIT);
          playSound('win');
          setSpeed(s => Math.max(MIN_SPEED, s - SPEED_INCREASE));
          newSnake.push(...prevSnake);
        } else {
          newSnake.push(...prevSnake.slice(0, -1));
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [direction, fruit, generateFruit, isPlaying, onScore, speed, gameOver, playSound]);

  return (
    <motion.div 
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between w-full max-w-sm mb-4">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-600">Score</h3>
          <p className="text-2xl font-bold">{score}</p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-600">Record</h3>
          <p className="text-2xl font-bold">{highScore}</p>
        </div>
      </div>

      <div 
        className="relative bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-600 rounded-lg shadow-lg overflow-hidden"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {(!isPlaying || gameOver) && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              {gameOver && (
                <motion.div 
                  className="text-white mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                  <p className="text-lg">Score: {score}</p>
                  {score > highScore && (
                    <p className="text-sm text-yellow-400 mt-1">Nouveau record!</p>
                  )}
                </motion.div>
              )}
              <motion.button
                onClick={resetGame}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg 
                         font-bold shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {gameOver ? 'Rejouer' : 'Commencer'}
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div
          className="absolute text-2xl"
          style={{
            left: fruit.x * CELL_SIZE,
            top: fruit.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={`${fruit.x}-${fruit.y}`}
        >
          {fruit.type}
        </motion.div>

        {snake.map((segment, i) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${i}`}
            className={`absolute rounded-lg ${i === 0 ? 'bg-green-700' : 'bg-green-500'}`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
        ))}
      </div>

      {isPlaying && (
        <motion.div 
          className="flex space-x-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Object.keys(DIRECTIONS).map((dir) => (
            <motion.button
              key={dir}
              onClick={() => setDirection(dir as keyof typeof DIRECTIONS)}
              className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg 
                       flex items-center justify-center text-xl font-bold
                       hover:bg-green-700 active:bg-green-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {dir === 'UP' ? '↑' : 
               dir === 'DOWN' ? '↓' : 
               dir === 'LEFT' ? '←' : 
               '→'}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};