import { useState, useCallback, useEffect } from "react"
import { type Position, GameStatus, type GameStatusType, Direction, type DirectionType } from "../types/game"
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from "../utils/constants"
import { checkCollision, generateFoodPosition, isOppositeDirection, isOutOfBounds, getNextPosition } from "../utils/gameHelpers"

export const useSnakeGame = () => {
    const getInitialSnake = (): Position[] => {
        const gridDimension = GRID_SIZE
        const centerX = Math.floor(gridDimension / 2);
        const centerY = Math.floor(gridDimension / 2);
        const snake: Position[] = [];

        for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
            snake.push({x: centerX - i, y: centerY})
        }

        return snake;
    }
    
    const [snake, setSnake] = useState<Position[]>(getInitialSnake);
    const [direction, setDirection] = useState<DirectionType>(Direction.RIGHT);
    const [nextDirection, setNextDirection] = useState<DirectionType>(Direction.RIGHT);
    const [food, setFood] = useState<Position>(() => 
    generateFoodPosition(getInitialSnake()));
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatusType>(GameStatus.IDLE)

    const startGame = useCallback(() => {
        const initialSnake = getInitialSnake();

        setSnake(initialSnake);
        setDirection(Direction.RIGHT);
        setNextDirection(Direction.RIGHT);
        
        const taken = initialSnake;
        setFood(generateFoodPosition(taken));
        setScore(0);
        setGameStatus(GameStatus.PLAYING);
    },[])

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (gameStatus !== GameStatus.PLAYING) return;

            let nextDirection: DirectionType | null = null;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    nextDirection = Direction.UP;
                    break;
                case 'ArrowDown':
                case 's':
                    nextDirection = Direction.DOWN;
                    break;
                case 'ArrowLeft':
                case 'a':
                    nextDirection = Direction.LEFT;
                    break;
                case 'ArrowRight':
                case 'd':
                    nextDirection = Direction.RIGHT;
                    break;
            }
            // prevent 180 degree turns
            if (nextDirection && !isOppositeDirection(direction, nextDirection)) {
                setNextDirection(nextDirection);
            }
        }
    , [direction, gameStatus])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress])

    const updateGame = useCallback(() => {
        if (gameStatus !== GameStatus.PLAYING) return;

        setDirection(nextDirection);
        
        let died = false;

        setSnake((prevSnake) => {
            const newSnake = [...prevSnake];
            const head = newSnake[0];
            const newHead = getNextPosition(head, nextDirection);
            
            // check collision
            if (isOutOfBounds(newHead) || checkCollision(newHead, newSnake)) {
                died = true;
                // setGameStatus(GameStatus.GAME_OVER);
                return prevSnake;
            }
            newSnake.unshift(newHead);
            return newSnake;
        })

        // setTimeout(() => {
            setSnake((prev) => {
                if (died) {
                    setGameStatus(GameStatus.GAME_OVER);
                    return prev;
                }
                const head = prev[0];
                const ate = head.x === food.x && head.y === food.y;
                if (ate) {
                    //  TODO: check why the score are multiplied by 2 instead of just 1 = Because React.Strict mode useCallback twice
                    setScore((s) => {
                        const ns = s + 1;
                        console.log('score:', ns);
                        const taken = [...snake];
                        setFood(generateFoodPosition(taken));
                        return ns;
                    })
                }
                // const next = [...prev];
                const next = ate ? [...prev] : [...prev.slice(0, prev.length - 1)];
                // console.log('next', next);
                return next;
            })
        // })
        // });

        // const ate = snake[0] && snake[0].x === food.x && snake[0].y === food.y;
        // if (ate) {
        //     const taken = [...snake];
        //     setFood(generateFoodPosition(taken));
        // }
    }, [gameStatus, nextDirection, food, snake])

    const resetGame = useCallback(() => {
        const initialSnake = getInitialSnake();
        setSnake(initialSnake);
        setDirection(Direction.RIGHT);
        setNextDirection(Direction.RIGHT);

        setFood(generateFoodPosition(initialSnake))
        setScore(0);
        setGameStatus(GameStatus.IDLE);
    }, [])

    return {
        snake,
        food,
        score,
        gameStatus,
        startGame,
        updateGame,
        resetGame
    }
}