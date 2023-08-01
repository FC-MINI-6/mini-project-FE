import { useEffect } from 'react'
import { ScheduleCalendar } from 'components/index'
import { userListStore } from 'stores/index'
import { Col, Row } from 'antd'

export const HomeCalendar = () => {
  const { setUserList } = userListStore()

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

  return (
    <Row>
      <Col flex={2}>
        <ScheduleCalendar />
      </Col>
      <Col flex={1}></Col>
    </Row>
  )
}
