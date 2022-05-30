import { useContext } from "react";
import { BoardContext } from "../../App";
import { generate } from "../../controller/Game";
import { CButton } from "../CButton";
import './index.scss';

export function CGameContols() {
    const board = useContext(BoardContext);

    function onNewGame() {
        const newBoard = generate('hard');        
        board.replace(newBoard);
    }

    return (
        <div className="game-controls">
            <div className="row">
                <CButton className="big" onClick={onNewGame}>New Game</CButton>
            </div>
            <div className="row">
                <CButton className="big">Resume</CButton>
            </div>
        </div>
    );
}