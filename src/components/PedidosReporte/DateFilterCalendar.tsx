// components/DateFilterCalendar.tsx
import { DateRange, RangeKeyDict } from 'react-date-range'
import { startOfDay, endOfDay } from 'date-fns'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

type Props = {
  dateRange: { startDate: Date; endDate: Date }
  onChange: (range: { startDate: Date; endDate: Date }) => void
}

export default function DateFilterCalendar({ dateRange, onChange }: Props) {
  return (
    <DateRange
      editableDateInputs={true}
      onChange={(ranges: RangeKeyDict) => {
        const selection = ranges.selection
        if (!selection.startDate || !selection.endDate) return

        onChange({
          startDate: startOfDay(selection.startDate),
          endDate: endOfDay(selection.endDate),
        })
      }}
      moveRangeOnFirstSelection={false}
      ranges={[
        {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          key: 'selection',
        },
      ]}
      className="rounded-2xl p-5"
    />
  )
}
