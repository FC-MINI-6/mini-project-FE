import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Table, Button } from 'antd'
import axios from 'axios'

import { addDoc, collection } from 'firebase/firestore'
import { notificationRef } from '@/firebase'
import dayjs from 'dayjs'

interface DataType {
  key: React.Key
  name: string
  type: string
  date: string
  day: number
  reason: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '이름',
    align: 'center',
    width: 40,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: '종류',
    align: 'center',
    width: 30,
    dataIndex: 'type',
    key: 'type',
    fixed: 'left'
  },
  {
    title: '신청기간',
    align: 'center',
    width: 100,
    dataIndex: 'date',
    key: 'date',
    fixed: 'left'
  },
  {
    title: '총 일수(일)',
    align: 'center',
    width: 40,
    dataIndex: 'day',
    key: 'day',
    fixed: 'left'
  },
  {
    title: '사유',
    align: 'center',
    dataIndex: 'reason',
    key: 'reason',
    width: 250
  },
  {
    title: 'Action',
    align: 'center',
    key: 'action',
    fixed: 'right',
    width: 50,
    render: (_, record) => (
      <>
        <Button type="primary">승인</Button>
        <Button danger>반려</Button>
      </>
    )
  }
]

const data: DataType[] = []
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    name: '김어쩌구',
    type: '연차',
    date: '2023-08-23 ~ 2023-08-24',
    day: 1,
    reason: '어쩌구저쩌구'
  })
}

export const ScheduleMgt = () => {
  useEffect(() => {
    getScheduleList()
  }, [])

  // 휴가 승인 반려 알림 푸시
  // *  호출 예시 >> pushDayOffStatusNotification('오후반차', 'APPROVE')
  const pushDayOffStatusNotification = async (type: string, status: string) => {
    const userNotiRef = collection(notificationRef, 'userid1', 'notiList')
    await addDoc(userNotiRef, {
      date: dayjs().format('YYYY-MM-DD'),
      message: `${type} 신청이 ${status === 'APPROVE' ? '승인' : '반려'}되었습니다.`,
      status: status,
      type: type,
      read: false
    })
  }

  // const body = {

  // }

  const getScheduleList = async () => {
    // await axios.get(`/admin/status`, body, {header: header})
  }

  return <Table columns={columns} dataSource={data} scroll={{ x: 1500 }} sticky />
}
