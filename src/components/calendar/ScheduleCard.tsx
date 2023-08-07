import React from 'react'
import { ICalendarSchedule } from 'types/index'
import { CALENDER_TYPE, USER_POSITION } from 'constants/index'

import { Card, Badge } from 'antd'
import { styled } from 'styled-components'

export const ScheduleCard = React.memo(({ schedule }: { schedule: ICalendarSchedule }) => {
  return (
    <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Badge color={schedule.color} />
        <span>
          {schedule.type === 3 ? '⏰ ' : '🏖️ '}
          {USER_POSITION[schedule.position]} {schedule.username} 님 {CALENDER_TYPE[schedule.type]}
        </span>
      </CardContent>
    </Card>
  )
})

const CardContent = styled.div`
  display: flex;
  gap: 8px;
`
