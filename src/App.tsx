import { useState } from 'react'
import { useSnakeGame } from './hooks/useSnakeGame'
import './App.css'
import { GameCanvas } from './components/GameCanvas'
// import { }

function App() {
  const {
    snake,
    food
  } = useSnakeGame()
  
  return (
    <div className="gap-8">
      <h1 className="text-6xl font-bold">
        Snake Game
      </h1>
      <p>
        Score: 8
      </p>
      <div className="min-h screen flex justify-center">
        {/* 15 x 15 snake game */}
        <GameCanvas snake={snake} food={food}/>
      </div>
      <p>
        WASD ←↑↓→ Move Snake
      </p>

    </div>


    
  )
}

export default App
