export interface IDayOffResponse {
  id: number
  status: string
  type: string
  startDate: string
  endDate: string | null
  reason: string
}
