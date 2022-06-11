import { generateRandomInteger } from "../lib";
import { levelConfig } from "../config";
import { ICell } from "../model/ICell";
import { IGame, TCells, TLevel } from "../model/IGame";

interface TValidateParams {
    cells: TCells;
    row?: number;
    col?: number;
    square?: number;
}

type TFnSolve = (cells: TCells) => TCells | null;
type TFnReset = (cells: TCells) => TCells;
type TFnPrepare = (cells: TCells, count: number) => TCells;
type TFnGenerate = (level: TLevel, size: number) => TCells;
type TFnValidate = (params: TValidateParams) => Array<string>;
type TFnValidateBoard = (cells: TCells) => Set<string>;
type TFnGetCellsBy = (cells: TCells, by: number) => TCells;
type TFnGetEmptyCell = (cells: TCells) => ICell | null;
type TFnSetLocal = (game: IGame) => void;
type TFnGetLocal = (level: TLevel) => IGame | void;
type TFnRemoveFromLocal = (level: TLevel) => void;

export const generate: TFnGenerate = function (level, size = 9) {
    const totalSize = Math.pow(size, 2);
    const squareSize = Math.sqrt(size);
    const board = (new Array(totalSize).fill(size)).map((item, index) => {
        const x = Math.floor(index / size);
        const y = index % size;
        return {
            value: null,
            row: x,
            col: y,
            square: Math.floor(x / squareSize) * squareSize + Math.floor(y / squareSize),
            readonly: true
        }
    });
    solve(board);
    setLevel(board, levelConfig[size][level]);

    return board;
}
export const reset: TFnReset = function (cells) {
    return cells.map(cell => ({ ...cell, value: !cell.readonly ? null : cell.value }));
}
export const validate: TFnValidate = function({ cells, row, col, square}) {
    const result: Array<string> = [];

    if (typeof row === 'number') {
        getCellsByRow(cells, row)
            .reduce<Map<number, Array<string>>>(
                (map, cell ) => {
                    if (!cell.value) {
                        return map;
                    }
                    if (map.has(cell.value)) {
                        (map.get(cell.value) as Array<string>).push(`${cell.row}_${cell.col}`);
                    } else {
                        map.set(cell.value, [`${cell.row}_${cell.col}`])
                    }
                    return map;
                },
                new Map()
            ).forEach((cells) => {
                if (cells.length > 1) {
                    result.push(...cells);
                }
            })
    }

    if (typeof col === 'number') {
        getCellsByCol(cells, col)
            .reduce<Map<number, Array<string>>>(
                (map, cell ) => {
                    if (!cell.value) {
                        return map;
                    }
                    if (map.has(cell.value)) {
                        (map.get(cell.value) as Array<string>).push(`${cell.row}_${cell.col}`);
                    } else {
                        map.set(cell.value, [`${cell.row}_${cell.col}`])
                    }
                    return map;
                },
                new Map()
            ).forEach((cells) => {
                if (cells.length > 1) {
                    result.push(...cells);
                }
            });
    }

    if (typeof square === 'number') {
        getCellsBySquare(cells, square)
            .reduce<Map<number, Array<string>>>(
                (map, cell ) => {
                    if (!cell.value) {
                        return map;
                    }
                    if (map.has(cell.value)) {
                        (map.get(cell.value) as Array<string>).push(`${cell.row}_${cell.col}`);
                    } else {
                        map.set(cell.value, [`${cell.row}_${cell.col}`])
                    }
                    return map;
                },
                new Map()
            ).forEach((cells) => {
                if (cells.length > 1) {
                    result.push(...cells);
                }
            });
    }

    return result;
}
export const validateBoard: TFnValidateBoard = function (cells) {
    const result = [];
    const size = Math.sqrt(cells.length);
    for(let i = 0; i < size; i++) {
        result.push(...validate({ cells, row: i, col: i, square: i }));
    }
    return new Set(result);
}
export const solve: TFnSolve = function(cells) {
    let result = null;
    const size = Math.sqrt(cells.length);
    const cell = getEmptyCell(cells);

    if (!cell) {
        return cells;
    }

    const values = new Set();

    while (values.size < size) {
        let value = generateRandomInteger(1, size);

        while (values.has(value)) {
            value = generateRandomInteger(1, size);
        }

        values.add(value);

        cell.value = value;

        const validResult = validate({ cells, row: cell.row, col: cell.col, square: cell.square });

        if (validResult.length) {
            cell.value = null;
            continue;
        }

        const solution = solve(cells);

        if (solution) {
            result = solution;
            break;
        } else {
            cell.value = null;
        }
    }

    return result;
}
const setLevel:TFnPrepare = function(cells, count) {
    const index = generateRandomInteger(0, cells.length - 1);

    if (!cells[index].value) {
        return setLevel(cells, count);
    }

    cells[index].value = null;
    cells[index].readonly = false;

    count--;

    if (count) {
        return setLevel(cells, count);
    }

    return cells;
}
const getEmptyCell:TFnGetEmptyCell = function(cells) {
    const cell = cells.find(cell => !cell.value);
    if (cell) {
        return cell;
    }
    return null;
}
const getCellsByRow: TFnGetCellsBy = function(cells, row) {
    return cells.filter(item => item.row === row);
}
const getCellsByCol: TFnGetCellsBy = function(cells, col) {
    return cells.filter(item => item.col === col);
}
const getCellsBySquare: TFnGetCellsBy = function(cells, square) {
    return cells.filter(item => item.square === square);
}
export const setToLocal:TFnSetLocal = function(game): void {
    localStorage.setItem(`sudoku_${game.level}`, JSON.stringify(game));
}
export const getFromLocal:TFnGetLocal = function(level) {
    const data = localStorage.getItem(`sudoku_${level}`);
    if (data) {
        return JSON.parse(data);
    }
}
export const removeFromLocal: TFnRemoveFromLocal = function(level) {
    localStorage.removeItem(`sudoku_${level}`)
}