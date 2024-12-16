import React from 'react';
import { motion } from 'framer-motion';
import { LudoPlayer, LudoPawn } from '../../types';

interface Props {
  players: LudoPlayer[];
  currentPlayer: number;
  onPawnClick: (pawnId: number) => void;
}

const BOARD_SIZE = 600;
const CELL_SIZE = BOARD_SIZE / 15;
const PAWN_SIZE = CELL_SIZE * 0.8;

const COLORS = {
  RED: '#EF4444',
  GREEN: '#10B981',
  YELLOW: '#F59E0B',
  BLUE: '#3B82F6'
};

export const Board: React.FC<Props> = ({ players, currentPlayer, onPawnClick }) => {
  const renderPawn = (pawn: LudoPawn, isActive: boolean) => (
    <motion.div
      key={pawn.id}
      className={`absolute rounded-full cursor-pointer 
                ${isActive ? 'ring-2 ring-white ring-offset-2' : ''}`}
      style={{
        width: PAWN_SIZE,
        height: PAWN_SIZE,
        backgroundColor: pawn.color,
        left: `${(pawn.position % 15) * CELL_SIZE}px`,
        top: `${Math.floor(pawn.position / 15) * CELL_SIZE}px`,
      }}
      onClick={() => onPawnClick(pawn.id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  );

  return (
    <div 
      className="relative bg-white rounded-lg shadow-xl"
      style={{ width: BOARD_SIZE, height: BOARD_SIZE }}
    >
      {/* Board Grid */}
      <div className="absolute inset-0 grid grid-cols-15 grid-rows-15">
        {Array.from({ length: 225 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-200"
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
          />
        ))}
      </div>

      {/* Home Areas */}
      {Object.entries(COLORS).map(([color, value], index) => (
        <div
          key={color}
          className="absolute w-1/3 h-1/3 border-2"
          style={{
            backgroundColor: value,
            opacity: 0.1,
            left: index % 2 === 0 ? 0 : BOARD_SIZE * 2/3,
            top: index < 2 ? 0 : BOARD_SIZE * 2/3
          }}
        />
      ))}

      {/* Pawns */}
      {players.map((player) =>
        player.pawns.map((pawn) =>
          renderPawn(pawn, player.id === currentPlayer)
        )
      )}
    </div>
  );
};
