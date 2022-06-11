import { IComputedValue } from "mobx";
import { ICell } from "./ICell";

export type TLevel = 'easy' | 'medium' | 'hard';
export type TCells = Array<ICell>;
export type TCellCoords = {
    x: number,
    y: number
}

export interface IGame {
    size: number;
    time: number;
    level: TLevel;
    cells: TCells;
    selectedCell: TCellCoords | null;
    selectedValue: number | null;
    counts: IComputedValue<Map<number, number>>;
    filled: IComputedValue<boolean>;
    solved: boolean;
}