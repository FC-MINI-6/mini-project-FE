export interface DayOff {
  id: number
  userId: number
  username: string
  position: string
  startDate: string
  endDate: string
  reasons: string
  type: number
  status: number
}

export interface Duty {
  id: number
  userId: number
  username: string
  position: string
  date: string
  reasons: string
  status: number
}

export interface StatusChange {
  status: number
}

export interface AdminStatus {
  dayOffList: DayOff[]
  dutyList: Duty[]
}
