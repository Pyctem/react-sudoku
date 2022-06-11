import { action } from "mobx";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { getFromLocal } from "../../controller/Game";
import { boardStore } from "../../store/board";
import { gameStore } from "../../store/game";
import { CButton } from "../CButton";

function CResumeGame() {
    const navigate = useNavigate();
    const savedGame = getFromLocal(gameStore.level);

    const clickHandler = action(() => {
        if (savedGame) {
            gameStore.time = savedGame.time;
            boardStore.replace(savedGame.cells);
            navigate('/board', { replace: true });
        }
    });

    if (!Boolean(savedGame)) {
        return null;
    }

    return (
        <div className="game-controls__row">
            <CButton className="game-controls__button" onClick={clickHandler}>RESUME</CButton>
        </div>
    )
}

export default observer(CResumeGame);