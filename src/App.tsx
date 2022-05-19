import React from 'react';
import './App.css';
import CTable from "./component/CTable";
import { fillCells } from "./lib";

function App() {
    const count = 9;

    function createCells(count: number) {
        let total = Math.pow(count, 2);
        let start = 1;
        let cells = {};
        while (start <= total) {
            const x = Math.ceil(start / count);
            const y = start % count || count;
            Reflect.set(cells, `${x}_${y}`, null)
            start++;
        }
        return cells
    }

    const cells = createCells(count);

    fillCells(cells, 28);

    return (
        <div className="App">
            <header className="App-header">Sudoku</header>
            <CTable cells={cells} />
        </div>
    );
}

export default App;
