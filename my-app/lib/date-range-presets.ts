export type DateRangePresetId =
  | "today"
  | "yesterday"
  | "last-7-days"
  | "last-30-days"
  | "this-month"
  | "last-month"
  | "custom"

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function endOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

function sameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const longDate: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
}

/**
 * Resolves inclusive [start, end] in local time for analytics-style presets.
 */
export function getPresetDateRange(
  preset: DateRangePresetId,
  ref = new Date()
): { start: Date; end: Date } {
  const y = ref.getFullYear()
  const m = ref.getMonth()

  switch (preset) {
    case "today":
      return { start: startOfDay(ref), end: endOfDay(ref) }
    case "yesterday": {
      const day = new Date(ref)
      day.setDate(day.getDate() - 1)
      return { start: startOfDay(day), end: endOfDay(day) }
    }
    case "last-7-days": {
      const start = new Date(ref)
      start.setDate(start.getDate() - 6)
      return { start: startOfDay(start), end: endOfDay(ref) }
    }
    case "last-30-days": {
      const start = new Date(ref)
      start.setDate(start.getDate() - 29)
      return { start: startOfDay(start), end: endOfDay(ref) }
    }
    case "this-month": {
      const start = new Date(y, m, 1)
      return { start: startOfDay(start), end: endOfDay(ref) }
    }
    case "last-month": {
      const start = new Date(y, m - 1, 1)
      const end = new Date(y, m, 0)
      return { start: startOfDay(start), end: endOfDay(end) }
    }
    case "custom":
    default:
      return { start: startOfDay(ref), end: endOfDay(ref) }
  }
}

export function formatPresetRangeLabel(
  preset: DateRangePresetId,
  ref = new Date()
): string {
  if (preset === "custom") {
    return "Custom range"
  }
  const { start, end } = getPresetDateRange(preset, ref)
  if (sameCalendarDay(start, end)) {
    return start.toLocaleDateString("en-US", longDate)
  }
  return `${start.toLocaleDateString("en-US", longDate)} - ${end.toLocaleDateString("en-US", longDate)}`
}
