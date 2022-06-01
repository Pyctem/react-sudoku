import { useRef, useState } from "react";
import './index.scss';

function CTimer() {
    const [ startTime ] = useState(Date.now());
    const [ currentTime, setCurrentTime ] = useState(Date.now());
    const reqAnFr = useRef(0);

    reqAnFr.current = window.setInterval(() => {
        setCurrentTime(Date.now());
    }, 1000);

    const date = new Date(currentTime - startTime);
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

export default CTimer;