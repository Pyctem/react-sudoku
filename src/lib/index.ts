export function isUnique<T>(value: T | Array<T>, ...args: Array<T>): boolean {
    if (Array.isArray(value)) {
        const set = new Set(value);
        return set.size === value.length;
    }
    const array = [value, ...args];
    const set = new Set(array);
    return set.size === array.length;
}

export function generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}