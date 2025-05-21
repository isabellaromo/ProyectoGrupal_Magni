import { isWithinInterval } from 'date-fns'

export function filterByDateRange<T extends { fecha: string }>(
  data: T[],
  dateRange: { startDate: Date; endDate: Date }
): T[] {
  return data.filter((item) => {
    const [year, month, day] = item.fecha.split('-').map(Number)
    const date = new Date(year, month - 1, day) // ← evita errores de parseo de fecha

    return isWithinInterval(date, {
      start: dateRange.startDate,
      end: dateRange.endDate,
    })
  })
}
