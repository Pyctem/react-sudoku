import { createContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import { gameStore, TGame } from '../../store/game';
import { boardStore, TObservableArray } from '../../store/board';
import CSudoku from "../CSudoku";

export const GameContext = createContext<TGame>(gameStore);
export const BoardContext = createContext<TObservableArray>(boardStore);

function CApp() {
    return (
        <BrowserRouter>
            <GameContext.Provider value={gameStore}>
                <BoardContext.Provider value={boardStore}>
                    <CSudoku />
                </BoardContext.Provider>
            </GameContext.Provider>
        </BrowserRouter>
    );
}

export default CApp;
