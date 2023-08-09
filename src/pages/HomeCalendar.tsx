import { useEffect, useState, useMemo } from 'react'
import { ScheduleCalendar, ScheduleList } from 'components/index'
import { getCalendarUserList, fetchScheduleCalendar } from 'apis/index'
import { userListStore, userSelectedStore, modalStore } from 'stores/index'
import { CALENDER_MENU_ALL, resultModalDatas } from 'constants/index'
import { ICalendarSchedule, ICalendarScheduleByDate } from 'types/index'
import { colorOfType, parseCalendarDayOffList } from 'utils/index'

import { Col, Row } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

type TScheduleByDate = {
  [key: string]: ICalendarSchedule[]
}

export const HomeCalendar = () => {
  const { openModal } = modalStore()
  const { setUserList } = userListStore()
  const { setSelectedId } = userSelectedStore()
  const [selectedSchedule, setSelectedSchedule] = useState<ICalendarSchedule[]>([])
  const [schedules, setSchedules] = useState<ICalendarSchedule[]>([])

  const schedulsMapByDate = useMemo(() => {
    const result = schedules.reduce((acc, current) => {
      const { startDate } = current
      if (acc[startDate]) {
        acc[startDate].push(current)
      } else {
        acc[startDate] = [current]
      }
      return acc
    }, {} as TScheduleByDate)
    return Object.keys(result).map(date => {
      return { date: date, schedules: result[date] } as ICalendarScheduleByDate
    })
  }, [schedules])
  const defaultDate = dayjs()

  const getSchedules = (year: number, month: number) => {
    fetchScheduleCalendar(year, month).then(
      res => {
        const dayOffSchedules = parseCalendarDayOffList(res.data.dayOffList)
        const dutySchedules = res.data.dutyList.map(duty => {
          return {
            ...duty,
            endDate: duty.date,
            startDate: duty.date,
            color: colorOfType(3),
            type: 3
          }
        })
        setSchedules([...dayOffSchedules, ...dutySchedules])
      },
      error => {
        openModal({
          ...resultModalDatas.FETCH_SCHEDULES_FAILURE,
          content: `${resultModalDatas.FETCH_SCHEDULES_FAILURE.content}${error.message ?? ''}`
        })
      }
    )
  }

  const getUserList = () => {
    getCalendarUserList().then(
      res => {
        setUserList([CALENDER_MENU_ALL, ...res.data.filter(user => user.username !== '어드민')])
        setSelectedId(-1)
      },
      error => {
        setUserList([CALENDER_MENU_ALL])
        openModal({
          ...resultModalDatas.FETCH_USER_LIST_FAILURE,
          content: `${resultModalDatas.FETCH_USER_LIST_FAILURE.content}${error.message ?? ''}`
        })
      }
    )
  }

  useEffect(() => {
    getUserList()
    getSchedules(defaultDate.get('year'), defaultDate.get('month') + 1)
  }, [])

  const onClickDate = (schedule: ICalendarSchedule[]) => {
    setSelectedSchedule(schedule)
  }

  const onChangeDate = (date: Dayjs) => {
    getSchedules(date.get('year'), date.get('month') + 1)
  }

  return (
    <Row wrap={false} gutter={[16, 0]}>
      <Col span={selectedSchedule.length !== 0 ? 20 : 24}>
        <ScheduleCalendar
          schdules={schedulsMapByDate}
          defaultDate={defaultDate}
          onClickDate={onClickDate}
          onChangeDate={onChangeDate}
        />
      </Col>
      {selectedSchedule.length !== 0 ? (
        <Col span={4}>
          <ScheduleList schedules={selectedSchedule} />
        </Col>
      ) : null}
    </Row>
  )
}
