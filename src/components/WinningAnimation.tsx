import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '../hooks/useWindowSize';

interface Props {
  show: boolean;
  onComplete?: () => void;
}

export const WinningAnimation: React.FC<Props> = ({ show, onComplete }) => {
  const { width, height } = useWindowSize();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        onConfettiComplete={onComplete}
      />
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Félicitations!</h2>
        <p className="text-xl text-gray-700">Vous avez gagné!</p>
      </div>
    </div>
  );
};
