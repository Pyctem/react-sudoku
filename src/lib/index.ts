import { TBoard } from "../component/CBoard";

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

// export function setCell(cell: TCell, key: string, value: any): boolean {
//     return Reflect.set(cell, key, value);
// }

export function getSquareByPosition(row: number, col: number): string {
    return `${Math.ceil(row / 3)}${Math.ceil(col / 3)}`;
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

export function validateBoard(board: TBoard, row: number, col: number): TBoard | null {
    const rowValues = getValuesByRow(board, row);
    if (!isUnique(rowValues)) {
        return null;
    }

    const colValues = getValuesByCol(board, col);
    if (!isUnique(colValues)) {
        return null;
    }

    const squareValues = getValuesBySquare(board, row, col);
    if (!isUnique(squareValues)) {
        return null;
    }

    return board;
}

export function solve(board: TBoard): TBoard | null {
    const size = board.length;
    const empty = getEmpty(board);
    if (!empty) {
        return board;
    }

    const [row, col] = empty;
    const valuesSet = new Set();
    const newBoard = JSON.parse(JSON.stringify(board));

    let result = null;

    while (valuesSet.size < size) {
        let randomValue = generateRandomInteger(size, 1);
        while (valuesSet.has(randomValue)) {
            randomValue = generateRandomInteger(size, 1);
        }
        valuesSet.add(randomValue);
        newBoard[row][col] = String(randomValue);
        result = validateBoard(newBoard, row, col) && solve(newBoard);
        if (result) {
            break;
        }
    }

    return result;
}

export function generateBoard(size: number = 9) {
    const board = new Array(size).fill(new Array(size).fill(''));
    return solve(board);
}