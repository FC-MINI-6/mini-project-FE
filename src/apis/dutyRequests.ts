import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, IDutyRequest, IDutyResponse } from 'types/index'

// 당직 신청
export const insertDuty = async (params: IDutyRequest): Promise<IBaseResponse> => {
  const response = await client.post('/mypage/duty/register', params)
  return response.data
}

// 당직 내역 조회
export const fetchDutyList = async (): Promise<IDataResponse<IDutyResponse[]>> => {
  const response = await client.get('/mypage/dutyList')
  return response.data
}

// 당직 신청 취소
export const deleteDuty = async (dutyId: number): Promise<IBaseResponse> => {
  const response = await client.delete(`/mypage/duty/${dutyId}`)
  return response.data
}
