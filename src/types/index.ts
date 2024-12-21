// Existing interfaces...

export interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
}

export interface User {
  email: string;
  points: number;
  level: number;
  referrals: string[];
  spins: number;
  winningCode?: string;
}

export interface WheelSegment {
  value: number;
  probability: number;
  color: string;
  flag: string;
  name: string;
}

export interface GameState {
  totalPlayers: number;
  winners: User[];
  maxWinners: number;
  prizePool: number;
  selectedGame: 'wheel' | 'snake' | 'thimbles' | null;
}

export interface SnakeSegment {
  x: number;
  y: number;
}

export interface Thimble {
  id: number;
  position: number;
  hasBall: boolean;
}

export interface ThimblesGameState {
  thimbles: Thimble[];
  isShuffling: boolean;
  canGuess: boolean;
  showBall: boolean;
  score: number;
  streak: number;
}

export interface LudoPlayer {
  id: number;
  name: string;
  color: string;
  pawns: LudoPawn[];
}

export interface LudoPawn {
  id: number;
  position: number;
  color: string;
}