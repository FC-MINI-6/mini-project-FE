export interface IDayOffResponse {
  id: number
  status: number
  type: number
  startDate: string
  endDate: string | null
  reason: string
}

export interface IDayOffNumResponse {
  numOfInitialDayOff: number
}

export interface IDayOffAllResponse {
  num: number
  dayOffList: IDayOffResponse[]
}
