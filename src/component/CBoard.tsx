import CCell, { TCellKey, TCell } from "./CCell";

export type TCells = {
    [key: TCellKey]: TCell;
}

export type TBoard = Array<Array<string>>

type TCBoard = {
    board: TBoard;
};

export default function CBoard({ board }: TCBoard) {
    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                row.map((value, colIndex) => <CCell key={`${rowIndex}_${colIndex}`} value={value} />)
            ))}
        </div>
    );
}