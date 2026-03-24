import { type Position, Direction, type DirectionType } from "../types/game";
import { GRID_SIZE } from "./constants";

export const generateRandomPosition = (): Position => {
    return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    };
};

export const positionsEqual = (p1: Position, p2: Position): boolean => {
    return p1.x === p2.x && p1.y === p2.y;
};

export const checkCollision = (position: Position, positions: Position[]): boolean => {
  return positions.some((pos) => positionsEqual(pos, position));
};

export const getNextPosition = (currentPosition: Position, direction: DirectionType) => {
    const nextPosition = { ...currentPosition };

    switch (direction) {
        case Direction.UP:
            nextPosition.y -= 1;
            break;
        case Direction.DOWN:
            nextPosition.y += 1;
            break;
        case Direction.LEFT:
            nextPosition.x -= 1;
            break;
        case Direction.RIGHT:
            nextPosition.x += 1;
            break;
    }
    return nextPosition;
}

export const isOutOfBounds = (position: Position): boolean => {
    return position.x < 0 || position.x >= GRID_SIZE || position.y < 0 || position.y >= GRID_SIZE
};

export const isOppositeDirection = (current: DirectionType, next: DirectionType): boolean => {
    return (
        (current === Direction.UP && next === Direction.DOWN) || 
        (current === Direction.DOWN && next === Direction.UP) || 
        (current === Direction.LEFT && next === Direction.RIGHT) ||
        (current === Direction.RIGHT && next === Direction.LEFT)
    );
}

export const generateFoodPosition = (snake: Position[]): Position => {
    let foodPosition: Position;
    do {
        foodPosition = generateRandomPosition();
    } while (checkCollision(foodPosition, snake));
    return foodPosition;
}