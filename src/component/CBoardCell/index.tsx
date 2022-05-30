import { action } from "mobx";
import { observer } from "mobx-react";
import { useContext } from "react";
import { GameContext, BoardContext } from "../CApp";
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
    const game = useContext(GameContext);
    const board = useContext(BoardContext);
    const value = board[row][col];
    const [ selectedRow, selectedCol ] = game.selected;
    const { active } = game;
    const buttonBaseClassName = 'board__button';
    const isActive = value && value === active;
    const isSelected = selectedRow === row && selectedCol === col;
    const buttonClassName = isActive || isSelected
        ? buttonBaseClassName + ' active'
        : buttonBaseClassName;

    const clickHandler = action(() => {
        if (active) {
            board[row][col] = active
        } else {
            if (isSelected) {
                game.selected = [];
            } else {
                game.selected = [ row, col ];
            }
        }
    })

    return (
        <div className={'board__cell'}>
            <CButton onClick={clickHandler} className={buttonClassName}>{value}</CButton>
        </div>
    );
}

export default observer(CBoardCell);