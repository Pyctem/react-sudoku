import { action } from "mobx";
import { observer } from "mobx-react";
import { boardStore } from "../../store/board";
import { gameStore } from "../../store/game";
import { CButton } from "../CButton";
import './index.scss';

type TCBoardCell = {
  row: number;
  col: number;
};

export type TCellValue = number | null;
export type TCell = {
  row: number;
  col: number;
  square: string;
  value: TCellValue;
  readonly: boolean;
}

function CBoardCell({ row, col }: TCBoardCell) {
    const value = boardStore[row][col];
    const [ selectedRow, selectedCol ] = gameStore.selected;
    const { active } = gameStore;
    const buttonBaseClassName = 'board__text';
    const isActive = value && value === active;
    const isSelected = selectedRow === row && selectedCol === col;
    const buttonClassName = isActive || isSelected
        ? buttonBaseClassName + ' active'
        : buttonBaseClassName;

    const clickHandler = action(() => {
        if (active) {
            if (isActive) {
                boardStore[row][col] = ''
            } else {
                boardStore[row][col] = active
            }
        } else {
            if (isSelected) {
                gameStore.selected = [];
            } else {
                gameStore.selected = [ row, col ];
            }
        }
    })

    return (
        <div className={'board__cell'}>
            <CButton onClick={clickHandler} className={'board__button'}>
                <span className={buttonClassName}>{value}</span>
            </CButton>
        </div>
    );
}

export default observer(CBoardCell);