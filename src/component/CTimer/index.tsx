import { action } from "mobx";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef } from "react";
import { gameStore } from "../../store/game";
import { errorStore } from "../../store/error";
import { validateBoard } from "../../controller/Game";
import './index.scss';

function CTimer() {
    const intervalRef = useRef(0);

    const callback = useCallback(action(() => {
        gameStore.time += 1000;
    }), []);

    useEffect(() => {
        intervalRef.current = window.setInterval(callback, 1000);

        return () => {
            window.clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(action(() => {
        if (gameStore.filled.get()) {
            const errors = validateBoard(gameStore.cells.slice());
            if (errors.size) {
                errorStore.replace(errors);
            } else {
                gameStore.solved = true;
                window.clearInterval(intervalRef.current);
            }
        }
    }), [gameStore.filled.get()]);

    const date = new Date(gameStore.time);
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
        <div className="timer">
            {gameStore.solved && 'You won: '}
            {Boolean(hours) && <span>{hours}H </span>}
            {Boolean(minutes) && <span>{minutes}M </span>}
            <span>{seconds}S</span>
        </div>
    )
}

export default observer(CTimer);