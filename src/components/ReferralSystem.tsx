import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { toast } from 'react-toastify';
import { GAME_CONFIG } from '../config/wheel';

export const ReferralSystem: React.FC = () => {
  const [referralEmail, setReferralEmail] = useState('');
  const { addReferral, user } = useGameStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReferral(referralEmail);
      toast.success('Parrainage ajouté avec succès!');
      setReferralEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors du parrainage');
    }
  };

  const remainingReferrals = GAME_CONFIG.REFERRALS_NEEDED - (user?.referrals.length || 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Système de Parrainage</h3>
      <p className="text-sm text-gray-600 mb-4">
        Il vous reste {remainingReferrals} parrainages pour débloquer le niveau suivant
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={referralEmail}
            onChange={(e) => setReferralEmail(e.target.value)}
            placeholder="Email du filleul"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
        >
          Ajouter un Parrainage
        </button>
      </form>
    </div>
  );
};
