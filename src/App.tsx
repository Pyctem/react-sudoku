import { useState, createContext } from 'react';
import { boardStore, TObservableArray } from './store/board';
import CBoard from "./component/CBoard";
import { TCell } from "./component/CCell";
import { CControls } from './component/CControls';
import './App.css';
import CHeader from './component/CHeader';
import { CGameContols } from './component/GameContols';

export const BoardContext = createContext<TObservableArray>(boardStore);

function App() {
    // const size = 9;
    // const board = generateBoard(size);

    // console.log(boardStore);

    const [value, setValue] = useState<string | null>(null);

    // class Cell implements TCell {
    //     row = 0;
    //     col = 0;
    //     square = '';
    //     value = null;
    //     readonly = false;
    //     constructor(x: number, y: number) {
    //         this.row = x;
    //         this.col = y;
    //         this.square = getSquareByPosition(x, y);
    //     }
    // }

    return (
        <div className="App">
            <BoardContext.Provider value={boardStore}>
                <CHeader />
                <CGameContols />
                <CBoard />
                {/* <CControls board={board} value={value} setValue={setValue} /> */}
            </BoardContext.Provider>
        </div>
    );
}

export default App;
