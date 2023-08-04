import { IDayOffResponse } from 'types/index'
import dayjs from 'dayjs'

// 연차 범위 중 주말이 포함 된 경우 주말 제외한 일 수
export const calcNumOfDayOff = (startDate: string, endDate: string) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  const diffDays = end.diff(start, 'day') + 1
  const diffWeeks = end.diff(start, 'week')

  if ((startDate !== endDate && end.get('day') <= start.get('day')) || diffWeeks >= 1) {
    return diffDays - 2 * (diffWeeks === 0 ? 1 : diffWeeks)
  }

  return diffDays
}

// 사용한 휴가의 합산
export const calcNumOfUsedDayOff = (historyList: IDayOffResponse[]) => {
  return historyList.reduce((acc, cur) => {
    return (acc += cur.type === '연차' ? calcNumOfDayOff(cur.startDate, cur.endDate!) : 0.5)
  }, 0)
}
