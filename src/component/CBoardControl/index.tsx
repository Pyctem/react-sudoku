import { action } from "mobx";
import { observer } from "mobx-react";
import { CButton } from "../CButton";
import { boardStore, countStore } from "../../store/board";
import { gameStore } from "../../store/game";

type TCBoardControl = {
    value: number;
}

function CBoardControl({ value }: TCBoardControl) {
    const count = countStore.get();
    const { active } = gameStore;

    const clickHandler = action(() => {
        const [ row, col ] = gameStore.selected;
        if ( typeof row === 'number' && typeof col === 'number') {
            if (boardStore[row][col] === String(value)) {
                boardStore[row][col] = '';
            } else {
                boardStore[row][col] = String(value);
            }
        } else {
            if (active === String(value)) {
                gameStore.active = '';
            } else {
                gameStore.active = String(value);
            }
        }
    });

    const buttonBaseClassName = 'board-controls__button';
    const buttonClassName = active && String(value) === active ? buttonBaseClassName + ' active' : buttonBaseClassName;

    return (
        <CButton className={buttonClassName} onClick={clickHandler}>
            <span className="board-controls__value">{value}</span>
            {Boolean(count.get(value)) && <span className="board-controls__count">{count.get(value)}</span>}
        </CButton>
    )
}

export default observer(CBoardControl);