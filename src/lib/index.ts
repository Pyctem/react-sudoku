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

export function generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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

export function validateBoard(board: TBoard, row: number, col: number, value?: string): TBoard | null {
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

        const isValid = validateBoard(board, row, col, value);

        values.add(value);

        if (!isValid) {
            continue;
        }

        set(board, row, col, value);

        const solution = solve(board);

        if (solution) {
            result = solution;
            break;
        } else {
            set(board, row, col, '');
        }
    }
    return result;
}

export function generateBoard(size: number): TBoard {
    const board = (new Array(size).fill(size)).map(() => new Array(size).fill(''));

    solve(board);

    setLevel(board, 50);

    return board
}

function setLevel(board: TBoard, count: number): TBoard {
    const size = board.length;
    const row = generateRandomInteger(0, size - 1);
    const col = generateRandomInteger(0, size - 1);
    const isEmpty = !Boolean(board[row][col]);

    if (isEmpty) {
        return setLevel(board, count);
    }

    set(board, row, col, '');

    count--;

    if (count) {
        return setLevel(board, count);
    }

    return board;
}

function set(board: TBoard, row: number, col: number, value: string) {
    board[row][col] = value;
    return board;
}