import CCell from "./CCell";

export type TBoard = Array<Array<string>>

type TCBoard = {
    board: TBoard;
    value: string | null,
};

export default function CBoard({ board, value }: TCBoard) {
    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                row.map((text, colIndex) => (
                    <CCell key={`${rowIndex}_${colIndex}`} text={text} value={value} />
                ))
            ))}
        </div>
    );
}