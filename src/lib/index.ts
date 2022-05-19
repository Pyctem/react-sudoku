import { TCell, TCellKey, TCellValue } from "../component/CCell";
import {TCells} from "../component/CTable";

export function isUnique<T>(value: T | Array<T>, ...args: Array<T>): boolean {
    if (Array.isArray(value)) {
        const set = new Set(value);
        return set.size === value.length;
    }
    const array = [value, ...args];
    const set = new Set(array);
    return set.size === array.length;
}

export function generateRandomInteger(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomCell(count: number): [number, number, number] {
    const value = generateRandomInteger(count, 1);
    const coords = generateRandomInteger(Math.pow(count, 2), 1);
    const row = Math.ceil(coords / count);
    const col = coords % count || count;
    return [row, col, value];
}

export function setCell(cell: TCell, key: string, value: any): boolean {
    return Reflect.set(cell, key, value);
}

export function fillCell(cells: TCells): boolean {
    const [row, col, value] = generateRandomCell(9);
    const square = getSquareByPosition(row, col);
    const key = `${row}_${col}`;
    const cell = Reflect.get(cells, key)
    if (cell?.value) {
        return false;
    }
    const valuesByRow = getValuesByRow(cells, row);
    const valuesByCol = getValuesByCol(cells, col);
    const valuesBySquare = getValuesBySquare(cells, square);
    const isUniqueByRow = isUnique([...valuesByRow, value]);
    const isUniqueByCol = isUnique([...valuesByCol, value]);
    const isUniqueBySquare = isUnique([...valuesBySquare, value]);
    if (isUniqueByRow && isUniqueByCol && isUniqueBySquare) {        
        return setCell(cell, 'value', value) && setCell(cell, 'readonly', true);
    }
    return false;
}

export function fillCells(cells: TCells, count: number): void {
    while (count) {
        if (fillCell(cells)) {
            count--;
        }
    }
}

export function getSquareByPosition(row: number, col: number): string {
    return `${Math.ceil(row / 3)}${Math.ceil(col / 3)}`;
}

export function getValuesByRow(cells: TCells, row: number): Array<TCellValue> {
    return Object.values(cells).filter(cell => cell.row === row && Boolean(cell.value)).map(cell => cell.value);
}

export function getValuesByCol(cells: TCells, col: number): Array<TCellValue> {
    return Object.values(cells).filter(cell => cell.col === col && Boolean(cell.value)).map(cell => cell.value);
}

export function getValuesBySquare(cells: TCells, square: string): Array<TCellValue> {
    return Object.values(cells).filter(cell => cell.square === square && Boolean(cell.value)).map(cell => cell.value);
}