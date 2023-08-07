import { client } from 'apis/index'
import {
  IBaseResponse,
  IDataResponse,
  ICalendarUser,
  IDayOffRequest,
  IDayOffResponse,
  ICalendarDatas
} from 'types/index'

// 캘린더 - 사용자 목록 조회
export const getCalendarUserList = async (): Promise<IDataResponse<ICalendarUser[]>> => {
  const response = await client.get('/mypage/schedule/userList')
  return response.data
}

// 캘린더 - 일정 조회
export const fetchScheduleCalendar = async (
  year: number,
  month: number
): Promise<IDataResponse<ICalendarDatas>> => {
  const response = await client.get(`/mypage/schedule/${year}/${month}`)
  return response.data
}
// 연차 신청
export const insertDayOff = async (params: IDayOffRequest): Promise<IBaseResponse> => {
  const response = await client.post('/mypage/dayoff/register', params, {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxNTU0NzU5fQ._jwEMhWFm5erS6SB8o6DqjzU_TnpsZ1gjsQtZXT20mgWNMS3qm09GWo21wuNHcEze4GKd8JQxwafKLD4RVGl4A`
    }
  })
  return response.data
}

// 연차 신청/사용 내역 조회
export const fetchDayOffList = async (): Promise<IDataResponse<IDayOffResponse[]>> => {
  const response = await client.get('/mypage/dayoffList', {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxNTU0NzU5fQ._jwEMhWFm5erS6SB8o6DqjzU_TnpsZ1gjsQtZXT20mgWNMS3qm09GWo21wuNHcEze4GKd8JQxwafKLD4RVGl4A`
    }
  })
  return response.data
}

// 휴가 취소
export const deleteDayOff = async (dayoffId: number): Promise<IBaseResponse> => {
  const response = await client.delete(`/mypage/dayoff/${dayoffId}`, {
    headers: {
      // TODO : 토큰 값 수정
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMDFAYWRtaW4uY29tIiwicm9sZSI6IuydvOuwmCIsImlkIjoxMiwiZXhwIjoxNjkxNTU0NzU5fQ._jwEMhWFm5erS6SB8o6DqjzU_TnpsZ1gjsQtZXT20mgWNMS3qm09GWo21wuNHcEze4GKd8JQxwafKLD4RVGl4A`
    }
  })
  return response.data
}
