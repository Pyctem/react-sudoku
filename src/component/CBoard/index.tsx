import { useContext } from "react";
import { BoardContext } from "../../App";
import CCell from "../CCell";

export default function CBoard() {
    const board = useContext(BoardContext);
    if (!board.length) {
        return null;
    }
    
    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                row.map((text, colIndex) => (
                    <CCell key={`${rowIndex}_${colIndex}`} text={text} value={'1'} />
                ))
            ))}
        </div>
    );
}