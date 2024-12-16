import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  diceValue: number;
  isRolling: boolean;
  onRollDice: () => void;
  currentPlayerColor: string;
  isCurrentPlayerTurn: boolean;
}

export const Controls: React.FC<Props> = ({
  diceValue,
  isRolling,
  onRollDice,
  currentPlayerColor,
  isCurrentPlayerTurn
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center text-3xl font-bold"
        animate={isRolling ? { rotate: 360 } : {}}
        transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
      >
        {diceValue || '?'}
      </motion.div>

      <motion.button
        onClick={onRollDice}
        disabled={!isCurrentPlayerTurn || isRolling}
        className={`px-6 py-3 rounded-lg text-white font-bold shadow-lg
                   ${isCurrentPlayerTurn ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'}`}
        style={{ backgroundColor: currentPlayerColor }}
        whileHover={isCurrentPlayerTurn ? { scale: 1.05 } : {}}
        whileTap={isCurrentPlayerTurn ? { scale: 0.95 } : {}}
      >
        {isRolling ? 'Lancement...' : 'Lancer le dé'}
      </motion.button>
    </div>
  );
};
