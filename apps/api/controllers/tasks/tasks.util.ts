export function computeNextOccurrence(recurrenceInDays: number) {
  return new Date(new Date().getTime() + recurrenceInDays * 24 * 60 * 60 * 1000)
}