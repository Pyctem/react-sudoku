import { action } from "mobx";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { generate } from "../../controller/Game";
import { boardStore } from "../../store/board";
import { gameStore } from "../../store/game";
import { CButton } from "../CButton";

function CNewGame() {
    const navigate = useNavigate();

    const clickHandler = action(() => {
        const newBoard = generate(gameStore.level);
        gameStore.time = 0;
        boardStore.replace(newBoard);
        navigate('/board', { replace: true });
    });

    return (
        <div className="game-controls__row">
            <CButton className="game-controls__button" onClick={clickHandler}>NEW</CButton>
        </div>
    )
}

export default observer(CNewGame);