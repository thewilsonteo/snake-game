import { Play, RotateCcw } from 'lucide-react';
import { GameStatus, type GameStatusType } from '../types/game';

interface GameControlsProps {
    gameStatus: GameStatusType,
    onStart: () => void;
    // onResume: () => void;
    onReset: () => void;
}

export const GameControls = ({
    gameStatus,
    onStart,
    // onResume,
    onReset,
}: GameControlsProps) => {
    const buttonBaseClasses = ""

    const renderMainButton = () => {
        switch (gameStatus) {
            case GameStatus.IDLE:
                return (
                    <button
                        onClick={onStart}
                        className={`${buttonBaseClasses}`}
                    >
                        <Play size={20} />
                        Play
                    </button>
                )
            case GameStatus.PLAYING:
                return;
            case GameStatus.GAME_OVER:
                return (
                    <button
                        onClick={onReset}
                        className={`${buttonBaseClasses}`}
                    >
                        <RotateCcw size={20} />
                        Reset
                    </button>  
                )
        }
    }

    return (
        <div>
            {renderMainButton()}

            {gameStatus !== GameStatus.IDLE && (
                <button
                    onClick={onReset}
                    className={`${buttonBaseClasses}`}
                >
                    <RotateCcw size={20} />
                    Reset
                </button>
            )}
        </div>
    )
};

