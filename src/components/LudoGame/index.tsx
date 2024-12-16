import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onScore: (points: number) => void;
}

export const LudoGame: React.FC<Props> = () => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Jeu de Ludo</h2>
        <p className="text-gray-600 text-center">
          Cette fonctionnalité sera bientôt disponible!
        </p>
      </motion.div>
    </div>
  );
};
