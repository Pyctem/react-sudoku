import {computed, observable, reaction} from 'mobx';
import { boardStore } from "./board";
import { IGame } from "../model/IGame";
import {removeFromLocal, setToLocal} from '../controller/Game';

export const levels = ['easy', 'medium', 'hard'] as const;

export const gameStore = observable<IGame>({
    size: 9,
    time: 0,
    level: 'easy',
    cells: boardStore,
    selectedCell: null,
    selectedValue: null,
    counts: computed<Map<number, number>>(
        () => {
            const map = new Map();
            for (let i = 1; i <= gameStore.size; i++) {
                map.set(i, gameStore.size);
            }

            gameStore.cells.forEach(cell => {
                if (cell.value) {
                    map.set(cell.value, map.get(cell.value) - 1);
                }
            });

            return map;
        },
        {
            equals: (a, b) => {
                return Array.from(a).toString() === Array.from(b).toString()
            }
        }
    ),
    filled: computed(() => Boolean(boardStore.length) && boardStore.every(cell => Boolean(cell.value))),
    solved: false,
});

reaction(
    () => gameStore.time,
    (time) => setToLocal(gameStore)
)

reaction(
    () => gameStore.cells,
    () => setToLocal(gameStore)
)

reaction(
    () => gameStore.solved,
    (solved) => {
        if (solved) {
            removeFromLocal(gameStore.level);
        }
    }
)