import { FC } from 'react';
import { LuckyWheel } from './components/LuckyWheel';
import { SnakeGame } from './components/SnakeGame';
import { ThimblesGame } from './components/ThimblesGame';
import { GameDashboard } from './components/GameDashboard';
import { LoginForm } from './components/LoginForm';
import { GameSelection } from './components/GameSelection';
import { ReferralSystem } from './components/ReferralSystem';
import { WinningAnimation } from './components/WinningAnimation';
import { HowToPlay } from './components/HowToPlay';
import { useGameStore } from './store/gameStore';
import { ToastContainer, toast } from 'react-toastify';
import { GAME_CONFIG } from './config/wheel';
import { useGameSound } from './hooks/useSound';
import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
  const { 
    user, 
    totalPlayers,
    maxWinners,
    selectedGame,
    addPoints,
    showWinningAnimation,
    setShowWinningAnimation,
    selectGame,
    logout
  } = useGameStore();

  const playSound = useGameSound();

  const handlePoints = (value: number) => {
    if (!user) return;

    addPoints(value);
    if (totalPlayers >= GAME_CONFIG.MIN_PLAYERS_TO_START) {
      toast.success(`Vous avez gagné ${value} points!`);
    } else {
      toast.info(`${value} points ajoutés. Les gains seront activés à partir de 100 joueurs.`);
    }
  };

  const handleLeaveGame = () => {
    playSound('click');
    selectGame(null);
  };

  const handleLogout = () => {
    playSound('click');
    logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <GameSelection />
        <button
          onClick={handleLogout}
          className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 
                   transition-all duration-300 font-bold shadow-lg"
        >
          Quitter le jeu
        </button>
      </div>
    );
  }

  const renderGame = () => {
    switch (selectedGame) {
      case 'wheel':
        return <LuckyWheel onSpinComplete={handlePoints} />;
      case 'snake':
        return <SnakeGame onScore={handlePoints} />;
      case 'thimbles':
        return <ThimblesGame onScore={handlePoints} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleLeaveGame}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 
                     transition-all duration-300 font-semibold shadow-md"
          >
            ← Retour au menu
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            {selectedGame === 'wheel' ? 'Roue de la Fortune' : 
             selectedGame === 'snake' ? 'Snake Game' : 'Jeu des Gobelets'} - CGBShop1
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 
                     transition-all duration-300 font-semibold shadow-md"
          >
            Quitter
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="flex justify-center items-center">
              {renderGame()}
            </div>
            <ReferralSystem />
          </div>
          <div>
            <GameDashboard
              user={user}
              totalPlayers={totalPlayers}
              remainingSpots={maxWinners}
            />
          </div>
        </div>
      </div>
      <WinningAnimation 
        show={showWinningAnimation}
        onComplete={() => setShowWinningAnimation(false)}
      />
      <HowToPlay />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
