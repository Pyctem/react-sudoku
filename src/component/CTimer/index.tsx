import { action } from "mobx";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef } from "react";
import { gameStore } from "../../store/game";
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

    const date = new Date(gameStore.time);
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
        <div className="timer">
            {Boolean(hours) && <span>{hours}H </span>}
            {Boolean(minutes) && <span>{minutes}M </span>}
            <span>{seconds}S</span>
        </div>
    )
}

export default observer(CTimer);