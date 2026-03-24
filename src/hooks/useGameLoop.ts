import { useEffect, useRef, useCallback } from "react";

export const useGameLoop = (
    callback: () => void,
    delay: number,
    isRunning: boolean,
) => {
    // console.log("delay", delay, "isRunning", isRunning)
    const requestRef = useRef<number>(undefined);
    const previousTimeRef = useRef<number>(undefined);

    const animate = useCallback(
        (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;

                if (deltaTime >= delay) {
                    callback();
                    previousTimeRef.current = time;
                }
            } else {
                previousTimeRef.current = time;
            }

            requestRef.current = requestAnimationFrame(animate);
        },
        [callback, delay]
    );

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);

            return () => {
                if (requestRef.current) {
                    cancelAnimationFrame(requestRef.current);
                }
            }
        } else {
            previousTimeRef.current = undefined;
        }
    }, [isRunning, animate]);
}

