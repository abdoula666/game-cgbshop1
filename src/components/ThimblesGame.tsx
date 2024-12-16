import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thimble } from './ThimblesGame/Thimble';
import { GameStats } from './ThimblesGame/GameStats';
import { ThimblesGameState } from '../types';
import { useGameSound } from '../hooks/useSound';

interface Props {
  onScore: (points: number) => void;
}

const THIMBLE_COUNT = 3;
const POINTS_PER_WIN = 0.005;
const SHUFFLE_DURATION = 2000;
const SHUFFLE_MOVES = 10;

export const ThimblesGame: React.FC<Props> = ({ onScore }) => {
  const [gameState, setGameState] = useState<ThimblesGameState>({
    thimbles: Array.from({ length: THIMBLE_COUNT }).map((_, i) => ({
      id: i,
      position: i,
      hasBall: false
    })),
    isShuffling: false,
    canGuess: false,
    showBall: false,
    score: 0,
    streak: 0
  });

  const playSound = useGameSound();

  const shuffle = useCallback(() => {
    if (gameState.isShuffling) return;

    playSound('shuffle');
    setGameState(prev => ({
      ...prev,
      isShuffling: true,
      canGuess: false,
      showBall: true,
      thimbles: prev.thimbles.map((t, i) => ({
        ...t,
        hasBall: i === Math.floor(Math.random() * THIMBLE_COUNT)
      }))
    }));

    setTimeout(() => {
      setGameState(prev => ({ ...prev, showBall: false }));
      let moves = 0;
      const interval = setInterval(() => {
        setGameState(prev => {
          const i = Math.floor(Math.random() * (THIMBLE_COUNT - 1));
          const newThimbles = [...prev.thimbles];
          [newThimbles[i], newThimbles[i + 1]] = [newThimbles[i + 1], newThimbles[i]];
          return { ...prev, thimbles: newThimbles };
        });
        moves++;
        if (moves >= SHUFFLE_MOVES) {
          clearInterval(interval);
          setGameState(prev => ({
            ...prev,
            isShuffling: false,
            canGuess: true
          }));
        }
      }, SHUFFLE_DURATION / SHUFFLE_MOVES);
    }, 1500);
  }, [gameState.isShuffling, playSound]);

  const handleGuess = (thimbleId: number) => {
    if (!gameState.canGuess) return;
    
    setGameState(prev => ({ ...prev, showBall: true, canGuess: false }));
    
    setTimeout(() => {
      setGameState(prev => {
        const guessedCorrectly = prev.thimbles.find(t => t.id === thimbleId)?.hasBall;
        const newScore = prev.score + (guessedCorrectly ? POINTS_PER_WIN : 0);
        const newStreak = guessedCorrectly ? prev.streak + 1 : 0;
        
        if (guessedCorrectly) {
          onScore(POINTS_PER_WIN);
          playSound('win');
        } else {
          playSound('lose');
        }

        return {
          ...prev,
          score: newScore,
          streak: newStreak
        };
      });
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showBall: false,
          thimbles: prev.thimbles.map(t => ({ ...t, hasBall: false }))
        }));
      }, 1000);
    }, 500);
  };

  return (
    <motion.div 
      className="flex flex-col items-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <GameStats score={gameState.score} streak={gameState.streak} />

      <div className="relative flex justify-center space-x-4 h-32">
        <AnimatePresence>
          {gameState.thimbles.map((thimble) => (
            <Thimble
              key={thimble.id}
              position={thimble.position}
              showBall={gameState.showBall}
              hasBall={thimble.hasBall}
              isLifted={gameState.isShuffling}
              onClick={() => handleGuess(thimble.id)}
              disabled={!gameState.canGuess}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={shuffle}
        disabled={gameState.isShuffling || gameState.canGuess}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg 
                 font-bold shadow-lg disabled:from-gray-400 disabled:to-gray-500 
                 disabled:cursor-not-allowed hover:from-purple-700 hover:to-purple-800 
                 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {gameState.isShuffling ? 'Mélange...' : 'Commencer'}
      </motion.button>

      <AnimatePresence>
        {gameState.canGuess && (
          <motion.p
            className="text-sm text-purple-600 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Choisissez un gobelet!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
