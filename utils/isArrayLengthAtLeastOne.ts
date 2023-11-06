export const isArrayLengthAtLeastOne = <T>(items: T[]): items is [T, ...T[]] => items.length >= 1
