import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, IDutyRequest } from 'types/index'

// 당직 신청
export const insertDuty = async (params: IDutyRequest): Promise<IBaseResponse> => {
  const response = await client.post('/mypage/duty/register', params, {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxMjk4OTk5fQ.lu3OkypFGrYJ5BofmO89eE7T8r3sjLRpkdnUbUvuRsvKd5y7z5ImW-0ZPnUUEKn0Sf0Omon6EhJPsO5QlZ4DWQ`
    }
  })
  return response.data
}
