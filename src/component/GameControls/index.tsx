import { action } from "mobx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BoardContext } from "../CApp";
import { CButton } from "../CButton";
import { generate } from "../../controller/Game";
import './index.scss';

export default function CGameControls() {
    const board = useContext(BoardContext);
    const navigate = useNavigate();

    const start = action(() => {
        const newBoard = generate('hard');
        board.replace(newBoard);
        navigate('/board', { replace: true });
    });

    return (
        <div className="game-controls">
            <div className="game-controls__row">
                <CButton className="game-controls__button" onClick={start}>New Game</CButton>
            </div>
            <div className="game-controls__row">
                <CButton className="game-controls__button">Resume</CButton>
            </div>
        </div>
    );
}