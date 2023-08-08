export interface DayOff {
  id: number
  userId: number
  username: string
  position: string
  startDate: string
  endDate: string
  reasons: string
  type: number
  status: string
}

export interface Duty {
  id: number
  userId: number
  username: string
  position: string
  date: string
  reasons: string
  status: string
}

export interface StatusChange {
  status: number
}
