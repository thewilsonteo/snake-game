import { useState, useCallback } from "react"
import { type Position } from "../types/game"
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from "../utils/constants"
import { generateFoodPosition } from "../utils/gameHelpers"

export const useSnakeGame = () => {
    const getInitialSnake = (): Position[] => {
        const gridDimension = GRID_SIZE
        const centerX = Math.floor(gridDimension / 2);
        const centerY = Math.floor(gridDimension/2);
        const snake: Position[] = [];

        for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
            snake.push({x: centerX - i , y: centerY})
        }

        return snake;
    }
    
    const [snake, setSnake] = useState<Position[]>(getInitialSnake);
    const [food, setFood] = useState<Position>(() => 
    generateFoodPosition(getInitialSnake(), GRID_SIZE));

    const startGame = useCallback(() => {
        const initialSnake = getInitialSnake();
        // const gridDim = GRID_SIZE;
        
        setSnake(initialSnake);
        // setDirection(Direction.RIGHT);
        // set
        const taken = initialSnake;
        setFood(generateFoodPosition(taken, GRID_SIZE))

        setSnake(initialSnake)
    },[])

    return {
        snake,
        food,
        startGame
    }
}