import React, { useState, useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Table, Button } from 'antd'
import axios from 'node_modules/axios/index'
import { addDoc, collection } from 'firebase/firestore'
import { notificationRef } from '@/firebase'
import dayjs from 'dayjs'

interface DataType {
  key: React.Key
  name: string
  date: string
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
    title: '근무날짜',
    align: 'center',
    width: 50,
    dataIndex: 'date',
    key: 'date',
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
    name: '김저쩌구',
    date: '2023-08-23',
    reason: '어쩌구저쩌구'
  })
}

export const DutyMgt = () => {
  useEffect(() => {
    getScheduleList()
  }, [])

  // 당직 승인 반려 알림 푸시
  // *  호출 예시 >> pushDutyStatusNotification('REJECT')
  const pushDutyStatusNotification = async (status: string) => {
    const userNotiRef = collection(notificationRef, 'userid1', 'notiList')
    await addDoc(userNotiRef, {
      date: dayjs().format('YYYY-MM-DD'),
      message: `당직 신청이 ${status === 'APPROVE' ? '승인' : '반려'}되었습니다.`,
      status: status,
      type: '당직',
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
