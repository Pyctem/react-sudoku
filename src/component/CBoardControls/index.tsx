import { useContext } from "react";
import { CButton } from "../CButton";
import { BoardContext, GameContext } from "../CApp";
import './index.scss';

export default function CBoardControls() {
    const game = useContext(GameContext);
    const board = useContext(BoardContext);

    const controls = board.reduce((acc, item) => {
        item.forEach(value => {
            if (value) {
                const numberValue = Number(value);
                const index = numberValue - 1;
                acc[index] = acc[index] - 1;
            }
        })
        return acc;
    }, (new Array(game.size).fill(game.size)));
    
    return (
        <div className="board-controls">
            {controls.map((control, index) => (
                <CButton className="board-controls__button">
                    <span className="board-controls__value">{index + 1}</span>
                    {/*<span className="count">{count}</span>*/}
                </CButton>
            ))}
        </div>
    );
}