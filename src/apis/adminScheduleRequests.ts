import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, DayOff, Duty } from 'types/index'

export const getDayOffList = async (): Promise<DayOff[]> => {
  const response = await client.get('/admin/status')
  return response.data.data.dayOffList
}

export const approveOrRejectDayOff = async (
  params: number,
  dayOffId: number
): Promise<IBaseResponse> => {
  const response = await client.put(`/admin/status/dayoff/${dayOffId}`, { status: params })
  return response.data
}

export const getDutyList = async (): Promise<Duty[]> => {
  const response = await client.get('/admin/status')
  return response.data.data.dutyList
}

export const approveOrRejectDuty = async (
  params: number,
  dutyId: number
): Promise<IBaseResponse> => {
  const response = await client.put(`/admin/status/duty/${dutyId}`, { status: params })
  return response.data
}
