import { createContext } from 'react';
import CBoard from "../CBoard";
import CHeader from '../CHeader';
import CGameControls from '../GameControls';
import CBoardControls from "../CBoardControls";
import { gameStore, TGame } from '../../store/game';
import { boardStore, TObservableArray } from '../../store/board';
import {CTimer} from "../CTimer";

export const GameContext = createContext<TGame>(gameStore);
export const BoardContext = createContext<TObservableArray>(boardStore);

function CApp() {
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
        <GameContext.Provider value={gameStore}>
            <BoardContext.Provider value={boardStore}>
                <CHeader />
                <CTimer />
                <CGameControls />
                <CBoard />
                <CBoardControls />
            </BoardContext.Provider>
        </GameContext.Provider>
    );
}

export default CApp;
