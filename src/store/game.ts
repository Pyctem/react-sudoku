import { observable } from 'mobx';

export type TLevel = 'easy' | 'medium' | 'hard';
export type TSelected = [row: number, col: number] | never[];
export type TGame = {
    size: number;
    level: TLevel;
    active: string;
    selected: TSelected;
};


const game = {
    size: 9,
    level: 'medium' as TLevel,
    active: '',
    selected: []
}

export const gameStore = observable<TGame>(game);