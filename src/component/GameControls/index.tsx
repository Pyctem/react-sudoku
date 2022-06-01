import { action } from "mobx";
import { useNavigate } from "react-router-dom";
import { CButton } from "../CButton";
import { generate } from "../../controller/Game";
import { boardStore } from "../../store/board";
import './index.scss';

export default function CGameControls() {
    const navigate = useNavigate();

    const start = action(() => {
        const newBoard = generate('hard');
        boardStore.replace(newBoard);
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