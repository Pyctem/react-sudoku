import { observer } from "mobx-react";
import CBoardCell from "../CBoardCell";
import { boardStore } from "../../store/board";
import './index.scss';


function CBoard() {
    if (!boardStore.length) {
        return null;
    }
    
    return (
        <div className='board'>
            {boardStore.map((row, rowIndex) => (
                row.map((text, colIndex) => (
                    <CBoardCell key={`${rowIndex}_${colIndex}`} row={rowIndex} col={colIndex} />
                ))
            ))}
        </div>
    );
}

export default observer(CBoard);