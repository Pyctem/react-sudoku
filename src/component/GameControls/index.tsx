import CNewGame from "../CNewGame";
import CResumeGame from "../CResumeGame";
import CLevel from "../CLevel";
import './index.scss';

export default function CGameControls() {
    
    return (
        <div className="game-controls">
            <CLevel />
            <CNewGame />
            <CResumeGame />
        </div>
    );
}