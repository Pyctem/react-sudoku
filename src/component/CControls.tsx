import { TBoard } from "./CBoard";
import { CContol } from "./CControl";

type TCControls = {
    board: TBoard
}

export function CControls({ board }: TCControls) {
    const size = board.length;
    const controls = board.reduce((acc, item) => {
        item.forEach(value => {
            if (value) {
                const numberValue = Number(value);
                const index = numberValue - 1;
                acc[index] = acc[index] - 1;
            }
        })
        return acc;
    }, (new Array(size).fill(size)));
    
    return (
        <div className="controls">
            {controls.map((control, index) => <CContol key={index} text={index + 1} count={control} />)}
        </div>
    );
}