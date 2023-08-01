import React from 'react'
import { DummyScheduleData } from 'components/index'
import { Card, Badge } from 'antd'
import { styled } from 'styled-components'

export const ScheduleCard = React.memo(({ schedule }: { schedule: DummyScheduleData }) => {
  return (
    <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Badge color={schedule.color} />
        <span>
          {schedule.type === '당직' ? '⏰ ' : '🏖️ '}
          {schedule.user} 님 {schedule.type}
        </span>
      </CardContent>
    </Card>
  )
})

const CardContent = styled.div`
  display: flex;
  gap: 8px;
`
