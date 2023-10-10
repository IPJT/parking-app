export const isNotNullish = <T>(item: T): item is Exclude<T, null | undefined> => item !== undefined && item !== null
