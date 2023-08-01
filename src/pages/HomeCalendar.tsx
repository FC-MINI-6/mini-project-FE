import { useEffect, useState } from 'react'
import { DummyScheduleData, ScheduleCalendar, ScheduleList } from 'components/index'
import { userListStore } from 'stores/index'
import { Col, Row } from 'antd'

export const HomeCalendar = () => {
  const { setUserList } = userListStore()
  const [selectedSchedule, setSelectedSchedule] = useState<DummyScheduleData[]>([])

  useEffect(() => {
    const dummyUserList = [
      { userName: '전체', userPosition: '' },
      {
        userId: 1,
        userName: '홍길동',
        userPosition: '대리'
      },
      {
        userId: 2,
        userName: '이은비',
        userPosition: '사원'
      },
      {
        userId: 3,
        userName: '나길순',
        userPosition: '팀장'
      },
      {
        userId: 4,
        userName: '김동동',
        userPosition: '사원'
      }
    ]

    setUserList(dummyUserList)
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
