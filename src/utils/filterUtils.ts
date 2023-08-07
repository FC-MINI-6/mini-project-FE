import { IDayOffResponse, IDutyResponse } from 'types/index'
import dayjs from 'dayjs'

// * 신청 내역 필터링 기준
// * 연차: 오늘 이전, 오전반차: 오늘날짜 9시 이전, 오후반차: 오늘 날짜 14시 이전
export const getFilteredDayOffRequestList = (dayOffList: IDayOffResponse[]) => {
  return (
    dayOffList.filter(data => {
      switch (data.type) {
        case 0:
          if (dayjs().startOf('date').diff(data.startDate) < 0) {
            return data
          }
          break
        case 1:
          if (
            dayjs().startOf('date').diff(data.startDate) < 0 ||
            (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') < 9)
          ) {
            return data
          }
          break
        case 2:
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
    dayOffList
      .filter(data => {
        switch (data.type) {
          case 0:
            if (dayjs().startOf('date').diff(data.startDate) >= 0) {
              return data
            }
            break
          case 1:
            if (
              dayjs().startOf('date').diff(data.startDate) >= 0 ||
              (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') >= 9)
            ) {
              return data
            }
            break
          case 2:
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
      })
      .filter(data => data.status === 1) ?? []
  )
}

// 당직 신청 내역 필터링
// 당직 사용 기준 : 당직 신청일이 조회한 날짜보다 이후
export const filteredDutyRequestList = (dutyList: IDutyResponse[]) => {
  return dutyList.filter(duty => dayjs().startOf('date').diff(duty.date) <= 0)
}

// 당직 사용 내역 필터링
// 상태가 대기만 빼고 날짜가 지난 케이스들
export const filteredDutyHistoryList = (dutyList: IDutyResponse[]) => {
  return dutyList.filter(duty => dayjs().startOf('date').diff(duty.date) > 0 && duty.status !== 0)
}
