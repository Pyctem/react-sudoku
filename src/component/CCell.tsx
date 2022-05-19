type TCCell = {
  value: TCellValue;
};

export type TCellKey = string;
export type TCellValue = number | null;

export default function CCell({ value }: TCCell) {
    return <div className='cell'>{value}</div>
}