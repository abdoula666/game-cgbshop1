import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  score: number;
  streak: number;
}

export const GameStats: React.FC<Props> = ({ score, streak }) => {
  return (
    <motion.div 
      className="flex items-center space-x-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-600">Score</h3>
        <p className="text-2xl font-bold">{score.toFixed(3)}</p>
      </div>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-600">Série</h3>
        <p className="text-2xl font-bold">{streak}</p>
      </div>
    </motion.div>
  );
};
