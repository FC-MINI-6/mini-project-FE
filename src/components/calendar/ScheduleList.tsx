import React from 'react'
import { ScheduleCard } from 'components/index'
import { ICalendarSchedule } from 'types/index'

type ScheduleListProps = {
  schedules: ICalendarSchedule[]
}

export const ScheduleList = React.memo(({ schedules }: ScheduleListProps) => {
  return (
    <ul>
      {schedules.map(schedule => (
        <ScheduleCard schedule={schedule} key={schedule.id} />
      ))}
    </ul>
  )
})
