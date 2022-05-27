import {Dispatch, SetStateAction} from "react";

type TCControl = {
    text: number;
    count: number;
    value: string | null;
    setValue: Dispatch<string | null>;
}

export function CControl({ text, count, value, setValue }: TCControl) {
    const set = () => {
        if (String(text) === value) {
            setValue(null);
        } else {
            setValue(String(text));
        }
    };

    const className = String(text) === value ? 'control active' : 'control';

    return (
        <button className={className} onClick={set} >
            <span className="text">{text}</span>
            <span className="count">{count}</span>
        </button>
    )
}