import React, { useCallback, useMemo } from 'react'
import { CalendarHeader } from 'components/index'
import { userSelectedStore } from 'stores/index'
import { ICalendarScheduleByDate, ICalendarSchedule } from 'types/index'

import { Calendar } from 'antd'
import locale from 'antd/es/calendar/locale/ko_KR'

import dayjs, { Dayjs } from 'dayjs'
import { styled } from 'styled-components'
import { DateCellRender } from './DateCellRender'

type TScheduleCalendar = {
  schdules: ICalendarScheduleByDate[]
  defaultDate: Dayjs
  onClickDate: (schedules: ICalendarSchedule[]) => void
  onChangeDate: (date: Dayjs) => void
}

export const ScheduleCalendar = React.memo(
  ({ schdules, defaultDate, onClickDate, onChangeDate }: TScheduleCalendar) => {
    const { selectedId } = userSelectedStore()

    const filteredSchedules = useMemo(() => {
      if (selectedId === -1) return schdules
      return schdules.map(data => {
        return {
          ...data,
          schedules: data.schedules.filter(schedule => schedule.userId === selectedId)
        }
      })
    }, [selectedId, schdules])

    const handleSelecteDate = useCallback(
      (date: Dayjs) => {
        const selectedDateSchedules =
          filteredSchedules.find(
            schedule => dayjs(schedule.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
          )?.schedules ?? []
        onClickDate(selectedDateSchedules)
      },
      [onClickDate]
    )

    const cellRender = (current: Dayjs) => {
      return DateCellRender(current, filteredSchedules)
    }

    const handleDateChange = (date: Dayjs) => {
      onChangeDate(date)
    }

    return (
      <StyledCalendar
        style={{ padding: 20, borderRadius: 6 }}
        mode="month"
        locale={locale}
        defaultValue={defaultDate}
        cellRender={cellRender}
        headerRender={({ value, onChange }: { value: Dayjs; onChange: (date: Dayjs) => void }) => (
          <CalendarHeader value={value} onChange={onChange} filteredList={filteredSchedules} />
        )}
        onChange={handleDateChange}
        onSelect={handleSelecteDate}
      />
    )
  }
)

const StyledCalendar = styled(Calendar)`
  table tbody tr > td.ant-picker-cell-in-view:nth-child(1) {
    color: var(--color-red-1);
  }

  table tbody tr > td.ant-picker-cell-in-view:nth-child(7) {
    color: var(--color-blue-3);
  }
`
