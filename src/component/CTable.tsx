import CCell, { TCellKey, TCellValue } from "./CCell";

export type TCells = {
    [key: TCellKey]: TCellValue;
}

type TCTable = {
    cells: TCells;
};

export default function CTable({ cells }: TCTable) {
    return (
        <div className='table'>
            {Object.entries(cells).map(([ key, value ]) => (
                <CCell key={key} value={value} />
            ))}
        </div>
    );
}