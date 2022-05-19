import { TCellKey, TCellValue } from "../component/CCell";
import {TCells} from "../component/CTable";

export function isDifferent<T>(value: T | Array<T>, ...args: Array<T>): boolean {
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

export function random(count: number): [TCellKey, TCellValue] {
    const value = generateRandomInteger(count, 1);
    const cell = generateRandomInteger(Math.pow(count, 2), 1);
    const x = Math.ceil(cell / count);
    const y = cell % count || count;
    return [`${x}_${y}`, value];
}

export function setCell(cells: TCells, key: TCellKey, value: TCellValue): boolean {
    if (Reflect.has(cells, key)) {
        Reflect.set(cells, key, value);
        return true;
    }
    return false;
}

export function fillCell(cells: TCells): boolean {
    const [key, value] = random(9);
    if (Reflect.get(cells, key)) {
        return false;
    }
    const [row, col] = key.split('_');
    const valuesByRow = getValuesByRow(cells, Number(row));
    const valuesByCol = getValuesByCol(cells, Number(col));
    const isUniqueByRow = isDifferent([...valuesByRow, value]);
    const isUniqueByCol = isDifferent([...valuesByCol, value]);
    if (isUniqueByRow && isUniqueByCol) {
        return setCell(cells, key, value);
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

export function getValuesByRow(cells: TCells, row: number): Array<number> {
    return Object.keys(cells)
        .filter(key => Reflect.get(cells, key) && key.trim().startsWith(String(row)))
        .map(key => Reflect.get(cells, key));
}

export function getValuesByCol(cells: TCells, col: number): Array<number> {
    return Object.keys(cells)
        .filter(key => Reflect.get(cells, key) && key.trim().endsWith(String(col)))
        .map(key => Reflect.get(cells, key));
}

export function getValuesBySquare(cells: TCells, col: number): Array<number> {
    return Object.keys(cells)
        .filter(key => Reflect.get(cells, key) && key.trim().endsWith(`_${col}`))
        .map(key => Reflect.get(cells, key));
}