import { action } from "mobx";
import { observer } from "mobx-react";
import { CButton } from "../CButton";
import { gameStore } from "../../store/game";
import { boardBem } from "../CBoard";

type TCBoardControl = {
    value: number;
}

function CBoardControl({ value }: TCBoardControl) {
    const counts = gameStore.counts.get();
    const { selectedValue, selectedCell } = gameStore;

    const clickHandler = action(() => {
        if (selectedCell) {
            const cell = gameStore.cells.find(cell => cell.row === selectedCell.x && cell.col === selectedCell.y)
            if (cell) {
                if (cell.value === value) {
                    cell.value = null;
                } else {
                    cell.value = value;
                }
            }
        } else {
            if (selectedValue === value) {
                gameStore.selectedValue = null;
            } else {
                gameStore.selectedValue = value;
            }
        }
    });

    const isSelected = Boolean(selectedValue) && selectedValue === value;
    const count = counts.get(value);

    return (
        <CButton className={boardBem('control').is({ select: isSelected })} onClick={clickHandler}>
            <span className={boardBem('value')}>{value}</span>
            {Boolean(count) && <span className={boardBem('count')}>{count}</span>}
        </CButton>
    )
}

export default observer(CBoardControl);