import { computed, IObservableArray, observable, reaction } from 'mobx';
import { setToLocal } from '../controller/Game';
import { gameStore } from "./game";

export type TBoard = Array<TBoardRow>;
export type TBoardRow = Array<TBoardCol>;
export type TBoardCol = string;
export type TObservableArray = IObservableArray<TBoardRow>;
export type TCountMap = Map<number, number>;

export const boardStore: TObservableArray = observable.array<TBoardRow>([]);

export const countStore = computed<TCountMap>(
    () => {
        const { size } = gameStore;
        const map = new Map();

        for (let i = 1; i <= size; i++) {
            map.set(i, size);
        }

        boardStore.forEach(row => {
            row.forEach(value => {
                const numberValue = Number(value);
                if (numberValue) {
                    map.set(numberValue, map.get(numberValue) - 1);
                }
            })
        });

        return map;
    },
    {
        equals: (a, b) => {
            return Array.from(a).toString() === Array.from(b).toString()
        }
    }
);

reaction(
    () => boardStore.reduce((acc, row) => {
        acc.push(...row);
        return acc;
    }, []),
    () => {
        setToLocal(boardStore, gameStore.time, gameStore.level);
    }
)