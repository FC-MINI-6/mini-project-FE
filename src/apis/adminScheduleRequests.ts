import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, AdminStatus } from 'types/index'

export const getDayOffList = async (): Promise<IDataResponse<AdminStatus>> => {
  const response = await client.get('/admin/status')
  return response.data
}

export const approveOrRejectDayOff = async (
  params: number,
  dayOffId: number
): Promise<IBaseResponse> => {
  const response = await client.put(`/admin/status/dayoff/${dayOffId}`, { status: params })
  return response.data
}

export const getDutyList = async (): Promise<IDataResponse<AdminStatus>> => {
  const response = await client.get('/admin/status')
  return response.data
}

export const approveOrRejectDuty = async (
  params: number,
  dutyId: number
): Promise<IBaseResponse> => {
  const response = await client.put(`/admin/status/duty/${dutyId}`, { status: params })
  return response.data
}
