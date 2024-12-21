import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { CircularProgress } from '@mui/material';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, isLoading, error } = useGameStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email.trim().toLowerCase()); // Normalize email
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6">Roue de la Fortune Cgbshop1</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#AE2740]"
            placeholder="Votre email Cgbshop1"
            required
          />
          <p className="mt-2 text-sm text-gray-600">
            Vous devez avoir un compte sur Cgbshop1.com pour jouer
          </p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#AE2740] text-white p-3 rounded-lg hover:bg-[#982235] 
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Commencer'
          )}
        </button>
      </form>
    </div>
  );
};