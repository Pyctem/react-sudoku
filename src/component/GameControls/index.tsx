import { gameStore } from "../../store/game";
import { getFromLocal } from "../../controller/Game";
import CNewGame from "../CNewGame";
import CResumeGame from "../CResumeGame";
import './index.scss';
import CLevel from "../CLevel";

export default function CGameControls() {
    const savedGame = getFromLocal(gameStore.level);
    return (
        <div className="game-controls">
            <CLevel />
            <CNewGame />
            {Boolean(savedGame) && <CResumeGame />}
        </div>
    );
}