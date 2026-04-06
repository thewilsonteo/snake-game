import { useSnakeGame } from './hooks/useSnakeGame'
import './App.css'
import { GameCanvas } from './components/GameCanvas'
import { GameControls } from './components/GameControls'
import { useGameLoop } from './hooks/useGameLoop'
import { INITIAL_SPEED } from './utils/constants'
import { GameStatus } from './types/game'

function App() {
  const {
    snake,
    food,
    score,
    gameStatus,
    startGame,
    // resumeGame,
    resetGame,
    updateGame,
  } = useSnakeGame()
  
  useGameLoop(updateGame, INITIAL_SPEED, gameStatus === GameStatus.PLAYING);

  return (
    <div className="flex item-center justify-center p-8">
      <div className="gap-8">
        <h1 className="text-6xl font-bold">
          Snake Game
        </h1>
        <p className="text-gray-400 text-lg">
          Score: {score}
        </p>
        <div className="flex flex-col items-center p-7">
          {/* 15 x 15 snake game */}
          <GameCanvas snake={snake} food={food}/>
        </div>
        <div>
          <GameControls
            gameStatus={gameStatus}
            onStart={startGame}
            // onResume={resumeGame}
            onReset={resetGame}
          />
        </div>
        <div className="p-7 text-gray-300">
          <h3 className="text-xl font-bold text-white mb-1">Instructions</h3>
          <p className="text-sm">
            W/A/S/D ←/↑/↓/→ Move Snake
          </p>
        </div>

      </div>
    </div>

  )
}

export default App;
