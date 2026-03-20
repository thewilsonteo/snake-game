// import { GRID_SIZE } from "../utils/constants";

export interface Position {
    x: number;  // horizontal
    y: number;  // vertical
}

const Direction = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT:"RIGHT",
} as const;
type Direction = (typeof Direction)[keyof typeof Direction]

const GameStatus = {
    IDLE: "IDLE",
    PLAYING: "PLAYING",
    GAME_OVER: "GAME_OVER",
} as const;
type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]

export interface GameState {
    snake: Position[];
    food: Position;
    direction: Direction;
    score: number;
    gameStatus: GameStatus;
    highScore: number;
}