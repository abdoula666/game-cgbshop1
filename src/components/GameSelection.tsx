import { FC } from 'react';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { motion } from 'framer-motion';
import { useGameSound } from '../hooks/useSound';

export const GameSelection: FC = () => {
  const { selectGame } = useGameStore();
  const { soundEnabled, toggleSound } = useSettingsStore();
  const playSound = useGameSound();

  const handleGameSelect = (game: 'wheel' | 'snake' | 'thimbles') => {
    playSound('click');
    selectGame(game);
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Choisissez Votre Jeu</h1>
        <motion.button
          onClick={() => {
            toggleSound();
            playSound('click');
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-600 text-white"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.button
          onClick={() => handleGameSelect('wheel')}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 sm:p-6 rounded-lg 
                   hover:from-purple-700 hover:to-purple-800 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl sm:text-4xl mb-2">🎡</div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Roue de la Fortune</h2>
          <p className="text-xs sm:text-sm opacity-90">Tournez la roue avec les drapeaux africains!</p>
        </motion.button>

        <motion.button
          onClick={() => handleGameSelect('snake')}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-6 rounded-lg 
                   hover:from-green-700 hover:to-green-800 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl sm:text-4xl mb-2">🐍</div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Snake Game</h2>
          <p className="text-xs sm:text-sm opacity-90">Mangez des fruits africains!</p>
        </motion.button>

        <motion.button
          onClick={() => handleGameSelect('thimbles')}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 sm:p-6 rounded-lg 
                   hover:from-purple-700 hover:to-purple-800 transition-all col-span-1 sm:col-span-2 lg:col-span-1 mx-auto w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl sm:text-4xl mb-2">🎲</div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Gobelets</h2>
          <p className="text-xs sm:text-sm opacity-90">Trouvez la balle sous les gobelets!</p>
        </motion.button>
      </div>
    </div>
  );
};