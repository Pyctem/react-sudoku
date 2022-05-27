type TCCell = {
  text: string;
  value: string | null;
};

export type TCellValue = number | null;
export type TCell = {
  row: number;
  col: number;
  square: string;
  value: TCellValue;
  readonly: boolean;
}

export default function CCell({ text, value }: TCCell) {
    const className =  text === String(value) ? 'cell active': 'cell'
    return <div className={className}>{text}</div>
}