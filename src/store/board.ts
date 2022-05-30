import { IObservableArray, observable } from 'mobx';

export type TBoard = Array<TBoardRow>;
export type TBoardRow = Array<TBoardCol>;
export type TBoardCol = string;
export type TObservableArray = IObservableArray<TBoardRow>;

export const boardStore: TObservableArray = observable.array<TBoardRow>([]);