import { block } from "bem-cn";
import { observer } from "mobx-react";
import CBoardCell from "../CBoardCell";
import { boardStore } from "../../store/board";
import './index.scss';

export const boardBem = block('board');

function CBoard() {
    if (!boardStore.length) {
        return null;
    }
    
    return (
        <div className={boardBem()}>
            {boardStore.map(cell => <CBoardCell key={`${cell.row}_${cell.col}`} cell={cell} />)}
        </div>
    );
}

export default observer(CBoard);