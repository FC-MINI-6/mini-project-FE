import React, { useCallback, useMemo } from 'react'
import { CalendarHeader } from 'components/index'
import { userSelectedStore } from 'stores/index'
import { CALENDER_TYPE, USER_POSITION } from 'constants/index'
import { ICalendarScheduleByDate, ICalendarSchedule } from 'types/index'

import type { TagProps } from 'antd'
import { Tag, Calendar } from 'antd'
import locale from 'antd/es/calendar/locale/ko_KR'

import dayjs, { Dayjs } from 'dayjs'
import { styled } from 'styled-components'

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

    const dateCellRender = (value: Dayjs) => {
      const listData =
        filteredSchedules.find(
          schedule => dayjs(schedule.date).format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
        )?.schedules ?? []
      return (
        <EventUl>
          {listData.map((item, index) => (
            <li key={index}>
              <Tag color={item.color as TagProps['color']}>
                {CALENDER_TYPE[item.type]} {item.username} {USER_POSITION[item.position]}
              </Tag>
            </li>
          ))}
        </EventUl>
      )
    }

    const cellRender = (current: Dayjs) => {
      return dateCellRender(current)
    }

    const handleDateChange = (date: Dayjs) => {
      onChangeDate(date)
    }

    return (
      <StyledCalendar
        style={{ padding: 20, borderRadius: 6 }}
        mode={'month'}
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

const EventUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
