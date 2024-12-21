import { create } from 'zustand';
import { User, GameState } from '../types';
import { GAME_CONFIG } from '../config/wheel';
import { verifyCustomer } from '../services/woocommerce';

interface GameStore extends GameState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  showWinningAnimation: boolean;
  selectedGame: 'wheel' | 'snake' | 'thimbles' | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  selectGame: (game: 'wheel' | 'snake' | 'thimbles' | null) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  user: null,
  totalPlayers: 0,
  winners: [],
  maxWinners: GAME_CONFIG.MAX_WINNERS,
  prizePool: GAME_CONFIG.PRIZE_POOL,
  isLoading: false,
  error: null,
  showWinningAnimation: false,
  selectedGame: null,

  login: async (email: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const isCustomer = await verifyCustomer(email);
      
      if (isCustomer) {
        set({
          user: {
            email,
            points: 0,
            level: 1,
            referrals: [],
            spins: 0
          },
          error: null
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion",
        user: null 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => set({
    user: null,
    selectedGame: null,
    showWinningAnimation: false,
    error: null
  }),

  selectGame: (game) => set({ selectedGame: game })
}));