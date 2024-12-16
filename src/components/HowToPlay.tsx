import React, { useState } from 'react';
import { GAME_CONFIG } from '../config/wheel';

export const HowToPlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        Comment Jouer ?
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Comment Jouer ?</h2>
            <div className="space-y-3 text-gray-700">
              <p>🎯 <strong>Objectif:</strong> Accumulez 100 points pour gagner un prix !</p>
              
              <h3 className="font-bold mt-4">Règles du jeu:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Vous devez avoir un compte sur CGBShop1.com pour participer</li>
                <li>Chaque niveau nécessite {GAME_CONFIG.POINTS_PER_LEVEL} points</li>
                <li>Pour passer au niveau suivant, vous devez avoir {GAME_CONFIG.REFERRALS_NEEDED} parrainages</li>
                <li>Les gains seront activés à partir de {GAME_CONFIG.MIN_PLAYERS_TO_START} joueurs</li>
                <li>Seuls les {GAME_CONFIG.MAX_WINNERS} premiers gagnants recevront un prix</li>
                <li>Prix total à gagner: {GAME_CONFIG.PRIZE_POOL}F</li>
              </ul>

              <h3 className="font-bold mt-4">Comment parrainer ?</h3>
              <p>Invitez vos amis à créer un compte sur CGBShop1.com, puis ajoutez leur email dans la section parrainage.</p>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};
