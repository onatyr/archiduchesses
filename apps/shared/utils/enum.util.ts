export function getOrdinal<T>(enumClass: T, value: T[keyof T] | undefined): number {
  return value ? Object.values(enumClass as object).indexOf(value) : -1
}