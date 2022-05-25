import { text } from "stream/consumers";

type TCControl = {
    text: number;
    count: number;
}
export function CContol({ text, count }: TCControl) {
    return (
        <button className="control">
            <span className="text">{text}</span>
            <span className="count">{count}</span>
        </button>
    )
}