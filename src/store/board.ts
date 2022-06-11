import { observable } from 'mobx';
import { ICell } from "../model/ICell";

export const boardStore = observable.array<ICell>([]);