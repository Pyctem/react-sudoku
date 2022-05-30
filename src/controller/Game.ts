import { TBoard } from "../store/board";
import { generateRandomInteger, isUnique } from "../lib";

export function generate(level: string, size: number = 9): TBoard {
    const board = (new Array(size).fill(size)).map(() => (new Array(size)).fill(''));
    solve(board);
    setLevel(board, 50);

    return board;
}

export function validate(board: TBoard, row: number, col: number, value?: string): TBoard | null {
    const rowValues = getValuesByRow(board, row);
    if (!isUnique([...rowValues, value])) {
        return null;
    }

    const colValues = getValuesByCol(board, col);
    if (!isUnique([...colValues, value])) {
        return null;
    }

    const squareValues = getValuesBySquare(board, row, col);
    if (!isUnique([...squareValues, value])) {
        return null;
    }

    return board;
}

export function solve(board: TBoard): TBoard | null {
    let result = null;
    const size = board.length;
    const empty = getEmpty(board);

    if (!empty) {
        return board;
    }

    const [row, col] = empty;
    const values = new Set();

    while (values.size < size) {
        let value = String(generateRandomInteger(1, size));

        while (values.has(value)) {
            value = String(generateRandomInteger(1, size));
        }

        const isValid = validate(board, row, col, value);

        values.add(value);

        if (!isValid) {
            continue;
        }

        setValue(board, row, col, value);

        const solution = solve(board);

        if (solution) {
            result = solution;
            break;
        } else {
            setValue(board, row, col, '');
        }
    }

    return result;
}

export function setLevel(board: TBoard, count: number): TBoard {
    const size = board.length;
    const row = generateRandomInteger(0, size - 1);
    const col = generateRandomInteger(0, size - 1);
    const isEmpty = !Boolean(board[row][col]);

    if (isEmpty) {
        return setLevel(board, count);
    }

    setValue(board, row, col, '');

    count--;

    if (count) {
        return setLevel(board, count);
    }

    return board;
}

export function getEmpty(board: TBoard): number[] | null {
    const size = board.length;
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (!board[row][col]) {
                return [row, col];
            }
        }
    }
    return null;
}

export function getValuesByRow(board: TBoard, row: number): Array<string> {
    return board.at(row)?.filter(value => Boolean(value)) || [];
}

export function getValuesByCol(board: TBoard, col: number): Array<string> {
    return board.filter(row => Boolean(row.at(col))).map(row => (row?.at(col) as string)) || [];
}

export function getValuesBySquare(board: TBoard, row: number, col: number): Array<string> {
    const squareSize = Math.sqrt(board.length);
    const squareRow = Math.floor( row / squareSize ) * squareSize;
    const squareCol = Math.floor( col / squareSize ) * squareSize;
    return board.reduce((acc, row, rowIndex) => {
        if (rowIndex >= squareRow && rowIndex < squareRow + squareSize) {
            const values = row.filter((value, colIndex) => {
                return colIndex >= squareCol && colIndex < squareCol + squareSize && Boolean(board[rowIndex][colIndex]);
            })
            acc.push(...values);
        }
        return acc;
    }, []);
}

export function setValue(board: TBoard, row: number, col: number, value: string): typeof value | false {
    board[row][col] = value;
    
    return value;
}