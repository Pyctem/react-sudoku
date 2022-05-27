import React, {useState} from 'react';
import CBoard from "./component/CBoard";
import { TCell } from "./component/CCell";
import { CControls } from './component/CControls';
import { generateBoard, getSquareByPosition } from "./lib";
import './App.css';

function App() {
    const size = 9;
    const board = generateBoard(size);

    const [value, setValue] = useState<string | null>(null);

    class Cell implements TCell {
        row = 0;
        col = 0;
        square = '';
        value = null;
        readonly = false;
        constructor(x: number, y: number) {
            this.row = x;
            this.col = y;
            this.square = getSquareByPosition(x, y);
        }
    }

    if (!board) {
        return null;
    }

    return (
        <div className="App">
            <header className="App-header">Sudoku</header>
            <CBoard board={board} value={value} />
            <CControls board={board} value={value} setValue={setValue} />
        </div>
    );
}

export default App;
