type TCCell = {
  cell: TCell;
};

export type TCellKey = string;
export type TCellValue = number | null;
export type TCell = {
  row: number;
  col: number;
  square: string;
  value: TCellValue;
  readonly: boolean;
}

export default function CCell({ cell }: TCCell) {
    return <div className='cell'>{cell.value}</div>
}