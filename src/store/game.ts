import { observable, reaction } from 'mobx';
import { setToLocal } from '../controller/Game';
import { boardStore } from './board';

export type TLevel = 'easy' | 'medium' | 'hard';
export type TSelected = [row: number, col: number] | never[];
export type TGame = {
    size: number;
    time: number;
    level: TLevel;
    active: string;
    selected: TSelected;
};


const game = {
    size: 9,
    time: 0,
    level: 'medium' as TLevel,
    active: '',
    selected: []
}

export const gameStore = observable<TGame>(game);

reaction(
    () => gameStore.time,
    (time) => {
        setToLocal(boardStore, time, gameStore.level);
    }
)