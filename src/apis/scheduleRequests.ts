import { client } from 'apis/index'
import {
  IBaseResponse,
  IDataResponse,
  ICalendarUser,
  IDayOffRequest,
  IDayOffResponse,
  ICalendarDatas,
  IDayOffNumResponse,
  IDayOffAllResponse
} from 'types/index'
import axios from 'axios'

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
  const response = await client.post('/mypage/dayoff/register', params)
  return response.data
}

// 연차 신청/사용 내역 조회
export const fetchDayOffList = async () => {
  const requestNumOfDayOff = await client.get('/mypage/dayoff/my')

  const requestDayOffList = await client.get('/mypage/dayoffList')

  return await axios.all([requestNumOfDayOff.data, requestDayOffList.data]).then(res => {
    return {
      num: (res[0].data as IDayOffNumResponse).numOfInitialDayOff,
      dayOffList: res[1].data as IDayOffResponse[]
    } as IDayOffAllResponse
  })
}

// 휴가 취소
export const deleteDayOff = async (dayoffId: number): Promise<IBaseResponse> => {
  const response = await client.delete(`/mypage/dayoff/${dayoffId}`)
  return response.data
}
