import React from 'react';
import { User } from '../types';
import { GAME_CONFIG } from '../config/wheel';

interface Props {
  user: User;
  totalPlayers: number;
  remainingSpots: number;
}

export const GameDashboard: React.FC<Props> = ({ user, totalPlayers, remainingSpots }) => {
  const referralsNeeded = GAME_CONFIG.REFERRALS_NEEDED - user.referrals.length;
  const canWin = totalPlayers >= GAME_CONFIG.MIN_PLAYERS_TO_START;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Tableau de bord</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-semibold">Points</h3>
          <p className="text-xl">{user.points.toFixed(3)}</p>
          {!canWin && (
            <p className="text-sm text-orange-600">
              Les gains seront activés à partir de 100 joueurs
            </p>
          )}
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Niveau</h3>
          <p className="text-xl">{user.level}</p>
          <p className="text-sm text-gray-600">
            {referralsNeeded > 0 
              ? `${referralsNeeded} parrainages requis pour le niveau suivant`
              : 'Niveau maximum atteint!'}
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-semibold">Parrainages</h3>
          <p className="text-xl">{user.referrals.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="font-semibold">Places restantes</h3>
          <p className="text-xl">{remainingSpots}</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Joueurs totaux: {totalPlayers} / {GAME_CONFIG.MAX_TOTAL_PLAYERS}
        </p>
        {!canWin && (
          <p className="text-sm text-red-600 mt-2">
            {GAME_CONFIG.MIN_PLAYERS_TO_START - totalPlayers} joueurs supplémentaires requis pour activer les gains
          </p>
        )}
      </div>
    </div>
  );
};