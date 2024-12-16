// Game Configuration Constants
export const GAME_CONSTANTS = {
  WHEEL: {
    SPIN_DURATION: 7000,
    EXTRA_SPINS: 5,
  },
  SNAKE: {
    GRID_SIZE: 20,
    CELL_SIZE: 20,
    INITIAL_SPEED: 200,
    MIN_SPEED: 50,
    SPEED_INCREASE: 10,
    POINTS_PER_FRUIT: 0.001,
  },
  THIMBLES: {
    COUNT: 3,
    POINTS_PER_WIN: 0.005,
    SHUFFLE_DURATION: 2000,
    SHUFFLE_MOVES: 10,
  },
  POINTS: {
    PER_LEVEL: 10,
    TO_WIN: 100,
  },
  REFERRALS: {
    NEEDED: 5,
  },
};

// Sound Effects
export const SOUND_EFFECTS = {
  WIN: '/sounds/win.mp3',
  LOSE: '/sounds/lose.mp3',
  CLICK: '/sounds/click.mp3',
  SHUFFLE: '/sounds/shuffle.mp3',
  SPIN: '/sounds/spin.mp3',
};
