import { client } from 'apis/index'
import { IBaseResponse, IDataResponse, IDutyRequest, IDutyResponse } from 'types/index'

// 당직 신청
export const insertDuty = async (params: IDutyRequest): Promise<IBaseResponse> => {
  const response = await client.post('/mypage/duty/register', params, {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxNTU0NzU5fQ._jwEMhWFm5erS6SB8o6DqjzU_TnpsZ1gjsQtZXT20mgWNMS3qm09GWo21wuNHcEze4GKd8JQxwafKLD4RVGl4A`
    }
  })
  return response.data
}

// 당직 내역 조회
export const fetchDutyList = async (): Promise<IDataResponse<IDutyResponse[]>> => {
  const response = await client.get('/mypage/dutyList', {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxNTU0NzU5fQ._jwEMhWFm5erS6SB8o6DqjzU_TnpsZ1gjsQtZXT20mgWNMS3qm09GWo21wuNHcEze4GKd8JQxwafKLD4RVGl4A`
    }
  })
  return response.data
}

// 당직 신청 취소
export const deleteDuty = async (dutyId: number): Promise<IBaseResponse> => {
  const response = await client.delete(`/mypage/duty/${dutyId}`, {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxNTU0NzU5fQ._jwEMhWFm5erS6SB8o6DqjzU_TnpsZ1gjsQtZXT20mgWNMS3qm09GWo21wuNHcEze4GKd8JQxwafKLD4RVGl4A`
    }
  })
  return response.data
}
