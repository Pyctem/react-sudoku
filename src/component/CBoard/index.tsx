import { useContext } from "react";
import { observer } from "mobx-react";
import CBoardCell from "../CBoardCell";
import { BoardContext } from "../CApp";
import './index.scss';

function CBoard() {
    const board = useContext(BoardContext);

    if (!board.length) {
        return null;
    }
    
    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                row.map((text, colIndex) => (
                    <CBoardCell key={`${rowIndex}_${colIndex}`} row={rowIndex} col={colIndex} />
                ))
            ))}
        </div>
    );
}

export default observer(CBoard);