import { block } from 'bem-cn';
import { action } from "mobx";
import { observer } from "mobx-react";
import { gameStore } from "../../store/game";
import { errorStore } from "../../store/error";
import { CButton } from "../CButton";
import { ICell } from "../../model/ICell";
import './index.scss';

const clazz = block('cell');

type TCBoardCell = {
    cell: ICell;
};

function CBoardCell({ cell }: TCBoardCell) {
    const { row, col, value, readonly } = cell;
    const { selectedCell, selectedValue } = gameStore;
    const isError = !readonly && errorStore.has(`${row}_${col}`);
    const isMatched = Boolean(value) && value === selectedValue;
    const isSelected = selectedCell?.x === row && selectedCell?.y === col;

    const clickHandler = action(() => {
        if (readonly) {
            return;
        }
        if (selectedValue) {
            if (isMatched) {
                cell.value = null;
            } else {
                cell.value = selectedValue
            }
            if (isError) {
                errorStore.delete(`${row}_${col}`);
            }
        } else {
            if (isSelected) {
                gameStore.selectedCell = null;
            } else {
                gameStore.selectedCell = { x: row, y: col };
            }
        }
    })

    return (
        <div className={clazz()}>
            <CButton onClick={clickHandler} className={clazz('button')}>
                <span className={clazz('text').is({ error: isError, select: isSelected, match: isMatched, block: readonly })}>
                    {value}
                </span>
            </CButton>
        </div>
    );
}

export default observer(CBoardCell);