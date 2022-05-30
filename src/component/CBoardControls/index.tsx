import { observer } from "mobx-react";
import { countStore } from "../../store/board";
import CBoardControl from "../CBoardControl";
import './index.scss';

function CBoardControls() {
    const count = countStore.get();

    return (
        <div className="board-controls">
            {Array.from(count.keys()).map(key => <CBoardControl key={key} value={key} />)}
        </div>
    );
}

export default observer(CBoardControls)