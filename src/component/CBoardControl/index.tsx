import { useContext } from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { CButton } from "../CButton";
import { BoardContext, GameContext } from "../CApp";
import { countStore } from "../../store/board";

type TCBoardControl = {
    value: number;
}

function CBoardControl({ value }: TCBoardControl) {
    const game = useContext(GameContext);
    const board = useContext(BoardContext);
    const count = countStore.get();
    const { active } = game;

    const clickHandler = action(() => {
        const [ row, col ] = game.selected;
        if ( typeof row === 'number' && typeof col === 'number') {
            if (board[row][col] === String(value)) {
                board[row][col] = '';
            } else {
                board[row][col] = String(value);
            }
        } else {
            if (active === String(value)) {
                game.active = '';
            } else {
                game.active = String(value);
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