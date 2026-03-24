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
    <div className="gap-8">
      <h1 className="text-6xl font-bold">
        Snake Game
      </h1>
      <p>
        Score: {score}
      </p>
      <div className="min-h screen flex justify-center">
        {/* 15 x 15 snake game */}
        <GameCanvas snake={snake} food={food}/>
      </div>
      <div>
        Play
        <GameControls
          gameStatus={gameStatus}
          onStart={startGame}
          // onResume={resumeGame}
          onReset={resetGame}
        />
      </div>
      <p>
        WASD ←↑↓→ Move Snake
      </p>

    </div>


    
  )
}

export default App
