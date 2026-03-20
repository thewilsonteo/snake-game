import { type Position } from "../types/game";

export const generateRandomPosition = (gridSize: number): Position => {
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    };
};

export const positionsEqual = (p1: Position, p2: Position): boolean => {
    return p1.x === p2.x && p2.y === p2.y;
};

export const checkCollision = (position: Position, positions: Position[]): boolean => {
    return positions.some((pos) => positionsEqual(pos, position));
};

export const generateFoodPosition = (snake: Position[], gridSize: number): Position => {
    let foodPosition: Position;
    do {
        foodPosition = generateRandomPosition(gridSize);
    } while (checkCollision(foodPosition, snake));
    return foodPosition;
}