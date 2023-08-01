import React from 'react'
import { DummyScheduleData, ScheduleCard } from 'components/index'

type ScheduleListProps = {
  schedules: DummyScheduleData[]
}

export const ScheduleList = React.memo(({ schedules }: ScheduleListProps) => {
  return (
    <ul>
      {schedules.map(schedule => (
        <ScheduleCard schedule={schedule} />
      ))}
    </ul>
  )
})
