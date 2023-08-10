import { ICalendarDayOff, IDayOffResponse, IDutyResponse, ICalendarSchedule } from 'types/index'
import { colorOfType } from 'utils/index'
import dayjs from 'dayjs'

// * 신청 내역 필터링 기준
// * 연차: 오늘 이전, 오전반차: 오늘날짜 9시 이전, 오후반차: 오늘 날짜 14시 이전
export const getFilteredDayOffRequestList = (dayOffList: IDayOffResponse[]) => {
  const filteredList = [] as IDayOffResponse[]

  dayOffList.map(data => {
    switch (data.type) {
      case 0:
        if (dayjs().startOf('date').diff(data.startDate) < 0) {
          filteredList.push(data)
        }
        break
      case 1:
        if (
          dayjs().startOf('date').diff(data.startDate) < 0 ||
          (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') < 9)
        ) {
          filteredList.push(data)
        }
        break
      case 2:
        if (
          dayjs().startOf('date').diff(data.startDate) < 0 ||
          (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') < 14)
        ) {
          filteredList.push(data)
        }
        break
      default:
        break
    }
  })
  return filteredList.sort((a, b) => a.startDate.localeCompare(b.startDate))
}

// 사용 내역 필터링
// * 사용 내역 필터 기준
// * startDate가 오늘 날짜 이후면서 승인 상태인 경우
export const getFilteredDayOffHistoryList = (dayOffList: IDayOffResponse[]) => {
  const filteredList = [] as IDayOffResponse[]

  dayOffList.map(data => {
    switch (data.type) {
      case 0:
        if (dayjs().startOf('date').diff(data.startDate) >= 0) {
          filteredList.push(data)
        }
        break
      case 1:
        if (
          dayjs().startOf('date').diff(data.startDate) >= 0 ||
          (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') >= 9)
        ) {
          filteredList.push(data)
        }
        break
      case 2:
        if (
          dayjs().startOf('date').diff(data.startDate) >= 0 ||
          (dayjs().startOf('date').diff(data.startDate) === 0 && dayjs().get('hour') >= 14)
        ) {
          filteredList.push(data)
        }
        break
      default:
        break
    }
  })
  return filteredList
    .filter(data => data.status === 1)
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
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

// 캘린더 휴가 리스트 파싱
export const parseCalendarDayOffList = (dayoffList: ICalendarDayOff[]) => {
  const dayOffSchedules = [] as ICalendarSchedule[]
  dayoffList.map(dayoff => {
    if (dayoff.startDate !== dayoff.endDate) {
      let date = dayjs(dayoff.startDate)
      const diffDays = dayjs(dayoff.endDate).diff(date, 'day')
      for (let i = 0; i <= diffDays; i++) {
        if (date.get('day') !== 0 && date.get('day') !== 6) {
          dayOffSchedules.push({
            ...dayoff,
            color: colorOfType(dayoff.type),
            startDate: date.format('YYYY-MM-DD')
          })
        }
        date = date.add(1, 'day')
      }
    } else {
      dayOffSchedules.push({ ...dayoff, color: colorOfType(dayoff.type) })
    }
  })
  return dayOffSchedules
}
