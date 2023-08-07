import { IDayOffResponse } from 'types/index'
import dayjs from 'dayjs'

// * 신청 내역 필터링 기준
// * 연차: 오늘 이전, 오전반차: 오늘날짜 9시 이전, 오후반차: 오늘 날짜 14시 이전
export const getFilteredDayOffRequestList = (dayOffList: IDayOffResponse[]) => {
  return (
    dayOffList.filter(data => {
      switch (data.type) {
        case '연차':
          if (dayjs().startOf('date').diff(data.startDate) < 0) {
            return data
          }
          break
        case '오전반차':
          if (
            dayjs().startOf('date').diff(data.startDate) < 0 ||
            (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') < 9)
          ) {
            return data
          }
          break
        case '오후반차':
          if (
            dayjs().startOf('date').diff(data.startDate) < 0 ||
            (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') < 14)
          ) {
            return data
          }
          break
        default:
          break
      }
    }) ?? []
  )
}

// 사용 내역 필터링
// * 사용 내역 필터 기준
// * startDate가 오늘 날짜 이후면서 승인 상태인 경우
export const getFilteredDayOffHistoryList = (dayOffList: IDayOffResponse[]) => {
  return (
    dayOffList.filter(data => {
      switch (data.type) {
        case '연차':
          if (dayjs().startOf('date').diff(data.startDate) >= 0) {
            return data
          }
          break
        case '오전반차':
          if (
            dayjs().startOf('date').diff(data.startDate) >= 0 ||
            (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') >= 9)
          ) {
            return data
          }
          break
        case '오후반차':
          if (
            dayjs().startOf('date').diff(data.startDate) >= 0 ||
            (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') >= 14)
          ) {
            return data
          }
          break
        default:
          break
      }
    }) ?? []
    // .filter(data => data.status === '승인') ?? []
  )
}
