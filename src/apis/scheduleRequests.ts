import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, ICalendarUser, IDayOffRequest } from 'types/index'

export const getCalendarUserList = async (): Promise<IDataResponse<ICalendarUser[]>> => {
  const response = await client.get('/mypage/schedule/userList')
  return response.data
}

// 연차 신청
export const insertDayOff = async (params: IDayOffRequest): Promise<IBaseResponse> => {
  const response = await client.post('/mypage/dayoff/register', params, {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxMjk4OTk5fQ.lu3OkypFGrYJ5BofmO89eE7T8r3sjLRpkdnUbUvuRsvKd5y7z5ImW-0ZPnUUEKn0Sf0Omon6EhJPsO5QlZ4DWQ`
    }
  })
  return response.data
}
