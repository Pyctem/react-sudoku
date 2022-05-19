import CCell, { TCellKey, TCell } from "./CCell";

export type TCells = {
    [key: TCellKey]: TCell;
}

type TCTable = {
    cells: TCells;
};

export default function CTable({ cells }: TCTable) {
    return (
        <div className='table'>
            {Object.entries(cells).map(([ key, cell ]) => (
                <CCell key={key} cell={cell} />
            ))}
        </div>
    );
}