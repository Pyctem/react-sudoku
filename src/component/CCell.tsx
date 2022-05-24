type TCCell = {
  value: string;
};

export type TCellValue = number | null;
export type TCell = {
  row: number;
  col: number;
  square: string;
  value: TCellValue;
  readonly: boolean;
}

export default function CCell({ value }: TCCell) {
    return <div className='cell'>{value}</div>
}