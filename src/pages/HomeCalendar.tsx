import { useEffect, useState } from 'react'
import { DummyScheduleData, ScheduleCalendar, ScheduleList } from 'components/index'
import { getCalendarUserList } from 'apis/index'
import { userListStore, userSelectedStore } from 'stores/index'
import { CALENDER_MENU_ALL } from 'constants/index'
import { Col, Row } from 'antd'

export const HomeCalendar = () => {
  const { setUserList } = userListStore()
  const { selectedId, setSelectedId } = userSelectedStore()
  const [selectedSchedule, setSelectedSchedule] = useState<DummyScheduleData[]>([])

  const getUserList = () => {
    getCalendarUserList().then(
      res => {
        setUserList([CALENDER_MENU_ALL, ...res.data.filter(user => user.username !== '어드민')])
        setSelectedId(-1)
      },
      error => {
        setUserList([CALENDER_MENU_ALL])
      }
    )
  }

  useEffect(() => {
    getUserList()
  }, [])

  const onClickDate = (schedule: DummyScheduleData[]) => {
    console.log(schedule)
    setSelectedSchedule(schedule)
  }

  return (
    <Row wrap={false} gutter={[16, 0]}>
      <Col span={selectedSchedule.length !== 0 ? 20 : 24}>
        <ScheduleCalendar onClickDate={onClickDate} />
      </Col>
      {selectedSchedule.length !== 0 ? (
        <Col span={4}>
          <ScheduleList schedules={selectedSchedule} />
        </Col>
      ) : null}
    </Row>
  )
}
