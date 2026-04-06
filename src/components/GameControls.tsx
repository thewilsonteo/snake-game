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
    const buttonBaseClasses = "px-6 py-3 rounded-lg font-semibold text-white transition-all gap-3 inline-flex items-center"

    const renderMainButton = () => {
        switch (gameStatus) {
            case GameStatus.IDLE:
                return (
                    <button
                        onClick={onStart}
                        className={`${buttonBaseClasses} bg-green-500 hover:bg-green-700`}
                    >
                        <Play size={20} />
                        <span>Play</span>
                    </button>
                )
            case GameStatus.PLAYING:
                return (
                    <button
                        color="blue"
                        onClick={onReset}
                        className={`${buttonBaseClasses}
                        bg-red-500
                        hover:bg-red-700
                        `}
                    >
                        <RotateCcw size={20} />
                        <span>Reset</span>
                    </button>  
                )
            case GameStatus.GAME_OVER:
                return (
                    <button
                        color="blue"
                        onClick={onReset}
                        className={`${buttonBaseClasses}
                        bg-red-500
                        hover:bg-red-700
                        `}
                    >
                        <RotateCcw size={20} />
                        <span>Reset</span>
                    </button>  
                )
        }
    }

    return (
        <div>
            {renderMainButton()}

            {/* {gameStatus !== GameStatus.IDLE && gameStatus !== GameStatus.GAME_OVER && (
                <button
                    onClick={onReset}
                    className={`${buttonBaseClasses}
                        bg-red-500
                        hover:bg-red-700
                        `}
                >
                    <RotateCcw size={20} />
                    <span>Reset</span>
                </button>
            )} */}
        </div>
    )
};

