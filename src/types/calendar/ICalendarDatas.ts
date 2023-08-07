export interface ICalendarDatas {
  dayOffList: ICalendarDayOff[]
  dutyList: ICalendarDuty[]
}

export interface ICalendarDayOff {
  id: number
  userId: number
  username: string
  position: number
  reason: string
  startDate: string
  endDate: string
  type: number
}

export interface ICalendarDuty {
  id: number
  userId: number
  username: string
  position: number
  reason: string
  date: string
}

export interface ICalendarSchedule {
  id: number
  userId: number
  username: string
  position: number
  reason: string
  startDate: string
  endDate: string
  color: string
  type: number
}

export interface ICalendarScheduleByDate {
  date: string
  schedules: ICalendarSchedule[]
}
