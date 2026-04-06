import { useEffect, useRef } from "react";
import { type Position } from "../types/game";
import { CELL_SIZE, GRID_SIZE, COLORS } from "../utils/constants";

interface GameCanvasProps {
    snake: Position[],
    food: Position;
    // gridSize: GridSize;
}

export const GameCanvas = ({ snake, food }: GameCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // clear canvas
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // draw grid lines
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth = 0.1;

        for (let i = 0; i <= CANVAS_SIZE; i += CELL_SIZE) {
            // vertical lines
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, CANVAS_SIZE);
            ctx.stroke();

            // horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(CANVAS_SIZE, i);
            ctx.stroke();
        }

        // draw snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = COLORS.snake;

            const x = segment.x * CELL_SIZE;
            const y = segment.y * CELL_SIZE;

            const radius = 0;
            ctx.beginPath();
            // ctx.roundRect(x + 2, y + 2, CELL_SIZE-4, CELL_SIZE-4, radius);

            ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, radius);
            ctx.fill();

            if (index === 0) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.beginPath();
                ctx.roundRect(x + 4, y + 4, CELL_SIZE - 8, (CELL_SIZE - 8)/2, radius)
                ctx.fill();
            }
        });

        // draw food as a circle
        ctx.fillStyle = COLORS.food;
        const foodX = food.x * CELL_SIZE + CELL_SIZE/2;
        const foodY = food.y * CELL_SIZE + CELL_SIZE/2;
        const foodRadius = CELL_SIZE/3;

        ctx.beginPath();
        ctx.arc(foodX, foodY, foodRadius, 0, 2 * Math.PI);
        ctx.fill();
    }, [snake, food])

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border-4 border-green-900 rounded-lg"
        />
    )
;}
