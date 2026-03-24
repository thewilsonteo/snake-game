// import { GRID_SIZE } from "../utils/constants";

export interface Position {
    x: number;  // horizontal
    y: number;  // vertical
}

export const Direction = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT:"RIGHT",
} as const;
export type DirectionType = (typeof Direction)[keyof typeof Direction]

export const GameStatus = {
    IDLE: "IDLE",
    PLAYING: "PLAYING",
    GAME_OVER: "GAME_OVER",
} as const;
export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus]

export interface GameState {
    snake: Position[];
    food: Position;
    direction: DirectionType;
    score: number;
    gameStatus: GameStatusType;
    highScore: number;
}