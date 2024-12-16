import { create } from 'zustand';
import { User, GameState } from '../types';
import { GAME_CONFIG } from '../config/wheel';
import { verifyCustomer } from '../services/woocommerce';

interface GameStore extends GameState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  showWinningAnimation: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  addPoints: (points: number) => void;
  addReferral: (email: string) => Promise<void>;
  setShowWinningAnimation: (show: boolean) => void;
  checkWinningCondition: () => boolean;
  generateWinningCode: () => string;
  incrementTotalPlayers: () => void;
  selectGame: (game: 'wheel' | 'snake' | 'thimbles' | null) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  user: null,
  totalPlayers: 0,
  winners: [],
  maxWinners: GAME_CONFIG.MAX_WINNERS,
  prizePool: GAME_CONFIG.PRIZE_POOL,
  isLoading: false,
  error: null,
  showWinningAnimation: false,
  selectedGame: null,

  selectGame: (game) => set({ selectedGame: game }),

  logout: () => set({
    user: null,
    selectedGame: null,
    showWinningAnimation: false,
    error: null
  }),

  login: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const isCustomer = await verifyCustomer(email);
      if (!isCustomer) {
        throw new Error("Vous devez avoir un compte sur CGBShop1.com pour jouer");
      }
      
      set(state => ({
        user: {
          email,
          points: 0,
          level: 1,
          referrals: [],
          spins: 0
        },
        totalPlayers: state.totalPlayers + 1
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Une erreur est survenue' });
    } finally {
      set({ isLoading: false });
    }
  },

  addPoints: (points: number) => {
    const state = get();
    if (!state.user) return;

    const newPoints = state.user.points + points;
    const newLevel = Math.floor(newPoints / GAME_CONFIG.POINTS_PER_LEVEL) + 1;
    
    set(state => ({
      user: state.user ? {
        ...state.user,
        points: newPoints,
        level: newLevel
      } : null
    }));

    if (newPoints >= 100 && state.winners.length < state.maxWinners) {
      const winningCode = get().generateWinningCode();
      set(state => ({
        winners: [...state.winners, { ...state.user!, winningCode }],
        showWinningAnimation: true
      }));
    }
  },

  addReferral: async (email: string) => {
    const state = get();
    if (!state.user) throw new Error("Utilisateur non connecté");
    
    if (state.user.referrals.includes(email)) {
      throw new Error("Ce parrainage existe déjà");
    }

    const isCustomer = await verifyCustomer(email);
    if (!isCustomer) {
      throw new Error("L'utilisateur doit avoir un compte sur CGBShop1.com");
    }

    set(state => ({
      user: state.user ? {
        ...state.user,
        referrals: [...state.user.referrals, email]
      } : null
    }));
  },

  setShowWinningAnimation: (show: boolean) => set({ showWinningAnimation: show }),

  checkWinningCondition: () => {
    const state = get();
    return (state.user?.points ?? 0) >= 100 && state.winners.length < state.maxWinners;
  },

  generateWinningCode: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    return Array.from({ length: 8 }, () => 
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  },

  incrementTotalPlayers: () => set(state => ({ totalPlayers: state.totalPlayers + 1 }))
}));
