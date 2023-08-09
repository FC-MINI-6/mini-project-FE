import { ICalendarScheduleByDate, IExcelData } from 'types/index'
import { CALENDER_TYPE, USER_POSITION } from 'constants/index'

export const parseExcelDatas = (list: ICalendarScheduleByDate[]) => {
  const excelDatas = [] as IExcelData[]
  let index = 1
  list
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(data => {
      data.schedules
        .sort((a, b) => a.startDate.localeCompare(b.startDate))
        .sort((a, b) => a.type - b.type)
        .map(schedule => {
          excelDatas.push({
            no: index,
            date: data.date,
            event: CALENDER_TYPE[schedule.type],
            name: schedule.username,
            position: USER_POSITION[schedule.position],
            reason: schedule.reason
          })
          index++
        })
    })
  return excelDatas
}
