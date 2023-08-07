export interface IDayOffResponse {
  id: number
  status: number
  type: number
  startDate: string
  endDate: string | null
  reason: string
}
