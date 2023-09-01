import { Tag } from 'antd'
import type { TagProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { styled } from 'styled-components'

import { ICalendarScheduleByDate } from 'types/index'
import { CALENDER_TYPE, USER_POSITION } from 'constants/index'

export const DateCellRender = (value: Dayjs, filteredSchedules: ICalendarScheduleByDate[]) => {
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

const EventUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
