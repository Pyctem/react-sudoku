import React from 'react';
import './App.css';
import CTable from "./component/CTable";
import { TCell } from "./component/CCell";
import { fillCells, getSquareByPosition } from "./lib";

function App() {
    const count = 9;

    function createCells(count: number) {
        let total = Math.pow(count, 2);
        let start = 1;
        let cells = {};
        while (start <= total) {
            const x = Math.ceil(start / count);
            const y = start % count || count;
            const cell = new Cell(x, y);
            Reflect.set(cells, `${x}_${y}`, cell);
            start++;
        }
        return cells
    }

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

    const cells = createCells(count);

    console.log(cells)

    fillCells(cells, 28);

    return (
        <div className="App">
            <header className="App-header">Sudoku</header>
            <CTable cells={cells} />
        </div>
    );
}

export default App;
