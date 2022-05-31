import { useRef, useState } from "react";

function CTimer() {
    const [ startTime ] = useState(Date.now());
    const [ currentTime, setCurrentTime ] = useState(Date.now());
    const reqAnFr = useRef(0);

    reqAnFr.current = window.setInterval(() => {
        setCurrentTime(Date.now());
    }, 1000);

    return <div>{Math.round((currentTime - startTime) / 1000)} s</div>
}

export { CTimer };