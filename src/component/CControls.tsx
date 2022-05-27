import { Dispatch } from "react";
import { TBoard } from "./CBoard";
import { CControl } from "./CControl";

type TCControls = {
    board: TBoard
    value: string | null,
    setValue: Dispatch<string | null>;
}

export function CControls({ board, value, setValue }: TCControls) {
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
            {controls.map((control, index) => (
                <CControl key={index} text={index + 1} count={control} value={value} setValue={setValue} />
            ))}
        </div>
    );
}