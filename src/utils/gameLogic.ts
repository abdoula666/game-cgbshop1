import { GAME_CONSTANTS } from './constants';
import { User } from '../types';

export const calculateLevel = (points: number): number => {
  return Math.floor(points / GAME_CONSTANTS.POINTS.PER_LEVEL) + 1;
};

export const checkWinningCondition = (user: User, totalWinners: number, maxWinners: number): boolean => {
  return user.points >= GAME_CONSTANTS.POINTS.TO_WIN && totalWinners < maxWinners;
};

export const generateWinningCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  return Array.from({ length: 8 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};