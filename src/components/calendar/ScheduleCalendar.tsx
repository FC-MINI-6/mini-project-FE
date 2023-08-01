import React, { useMemo } from 'react'
import { CalendarHeader } from 'components/index'
import { userSelectedStore } from 'stores/index'

import type { TagProps } from 'antd'
import { Tag, Calendar } from 'antd'
import locale from 'antd/es/calendar/locale/ko_KR'

import { Dayjs } from 'dayjs'
import { styled } from 'styled-components'

const getListData = (value: Dayjs) => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        { color: 'geekblue', type: '연차', user: '홍길동' },
        { color: 'green', type: '오후반차', user: '홍길동' }
      ]
      break
    case 10:
      listData = [
        { color: 'lime', type: '오전반차', user: '홍길동' },
        { color: 'geekblue', type: '연차', user: '홍길동' }
      ]
      break
    case 15:
      listData = [
        { color: 'orange', type: '당직', user: '홍길동' },
        { color: 'geekblue', type: '연차', user: '홍길동' },
        { color: 'orange', type: '당직', user: '홍길동' },
        { color: 'green', type: '오후반차', user: '홍길동' }
      ]
      break
    default:
  }
  return listData || []
}

export const ScheduleCalendar = React.memo(() => {
  const { selectedId } = userSelectedStore()

  const filteredData = useMemo(() => {
    // TODO : 사용자 ID 값으로 캘린더 데이터 필터링
    console.log(selectedId)
  }, [selectedId])

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <EventUl>
        {listData.map((item, index) => (
          <li key={index}>
            <Tag color={item.color as TagProps['color']}>
              {item.type} {item.user}
            </Tag>
          </li>
        ))}
      </EventUl>
    )
  }

  const cellRender = (current: Dayjs) => {
    return dateCellRender(current)
  }

  return (
    <Calendar
      style={{ padding: 20, borderRadius: 6 }}
      mode={'month'}
      locale={locale}
      cellRender={cellRender}
      headerRender={({ value, onChange }) => <CalendarHeader value={value} onChange={onChange} />}
    />
  )
})

const EventUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
