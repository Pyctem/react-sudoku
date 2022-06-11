export interface ICell {
    value: number | null;
    row: number;
    col: number;
    square: number;
    readonly: boolean;
}