import React, { useCallback, useMemo } from 'react'
import { CalendarHeader } from 'components/index'
import { userSelectedStore } from 'stores/index'

import type { TagProps } from 'antd'
import { Tag, Calendar } from 'antd'
import locale from 'antd/es/calendar/locale/ko_KR'

import { Dayjs } from 'dayjs'
import { styled } from 'styled-components'

// 추후 삭제
const dummySchedule = [
  {
    date: 8,
    datas: [
      { color: 'geekblue', type: '연차', user: '홍길동' },
      { color: 'green', type: '오후반차', user: '홍길동' }
    ]
  },
  {
    date: 11,
    datas: [
      { color: 'lime', type: '오전반차', user: '홍길동' },
      { color: 'geekblue', type: '연차', user: '홍길동' }
    ]
  },
  {
    date: 26,
    datas: [
      { color: 'orange', type: '당직', user: '홍길동' },
      { color: 'geekblue', type: '연차', user: '홍길동' },
      { color: 'orange', type: '당직', user: '홍길동' },
      { color: 'green', type: '오후반차', user: '홍길동' }
    ]
  }
]

// 추후 삭제
export interface DummyScheduleData {
  color: string
  type: string
  user: string
}

type ScheduleCalendar = {
  onClickDate: (schedules: DummyScheduleData[]) => void
}

export const ScheduleCalendar = React.memo(({ onClickDate }: ScheduleCalendar) => {
  // const { selectedId } = userSelectedStore()

  // TODO : 사용자 ID 값으로 캘린더 데이터 필터링
  // const filteredData = useMemo(() => {
  //   console.log(selectedId)
  // }, [selectedId])

  const handleSelecteDate = useCallback(
    (date: Dayjs) => {
      const selectedDateSchedules =
        dummySchedule.find(schedule => schedule.date === date.date())?.datas ?? []
      onClickDate(selectedDateSchedules)
    },
    [onClickDate]
  )

  const dateCellRender = (value: Dayjs) => {
    const listData = dummySchedule.find(schedule => schedule.date === value.date())?.datas ?? []
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
    <StyledCalendar
      style={{ padding: 20, borderRadius: 6 }}
      mode={'month'}
      locale={locale}
      cellRender={cellRender}
      headerRender={({ value, onChange }) => <CalendarHeader value={value} onChange={onChange} />}
      onSelect={handleSelecteDate}
    />
  )
})

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
