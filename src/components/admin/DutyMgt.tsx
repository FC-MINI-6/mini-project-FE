import { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { Table, Button, message, Popconfirm } from 'antd'
import { addDoc, collection } from 'firebase/firestore'
import { notificationRef } from '@/firebase'
import dayjs from 'dayjs'
import { getDutyList, approveOrRejectDuty } from 'apis/index'
import { dutyListStore } from 'stores/index'
import { Duty } from 'types/index'

export const DutyMgt = () => {
  const { dutyList, setDutyList } = dutyListStore()
  const columns: ColumnsType<Duty> = [
    {
      title: '이름',
      align: 'center',
      width: 40,
      dataIndex: 'username',
      key: 'username',
      fixed: 'left'
    },
    {
      title: '근무날짜',
      align: 'center',
      width: 50,
      dataIndex: 'date',
      key: 'date',
      sorter: (a: Duty, b: Duty) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortDirections: ['ascend'],
      fixed: 'left'
    },
    {
      title: '사유',
      align: 'center',
      dataIndex: 'reason',
      key: 'reason',
      width: 100
    },
    {
      title: '상태',
      align: 'center',
      key: 'status',
      fixed: 'right',
      width: 80,
      filters: [
        {
          text: '처리중',
          value: 0
        },
        {
          text: '승인처리완료',
          value: 1
        },
        {
          text: '반려처리완료',
          value: 2
        }
      ],
      onFilter: (value: string | number | boolean, record: Duty) => record.status === Number(value),
      defaultSortOrder: 'ascend',
      sorter: (a: Duty, b: Duty) => {
        if (a.status === 0 && b.status !== 0) {
          return -1
        } else if (a.status !== 0 && b.status === 0) {
          return 1
        } else {
          return a.status - b.status
        }
      },
      render: (record: Duty) => (
        <>
          {record.status === 0 ? (
            <>
              <Popconfirm
                title="요청 승인 ✅"
                description="해당 요청을 승인처리 하시겠습니까?"
                onConfirm={() => confirmApproval(record)}
                okText="확인"
                cancelText="취소">
                <Button type="primary">승인</Button>
              </Popconfirm>
              <Popconfirm
                title="요청 반려 ❌"
                description="해당 요청을 반려처리 하시겠습니까?"
                onConfirm={() => confirmRejection(record)}
                okText="확인"
                cancelText="취소">
                <Button danger>반려</Button>
              </Popconfirm>
            </>
          ) : record.status === 1 ? (
            <Button type="primary" disabled>
              승인처리 완료
            </Button>
          ) : (
            <Button type="primary" disabled>
              반려처리 완료
            </Button>
          )}
        </>
      )
    }
  ]

  useEffect(() => {
    getDutyListAll()
  }, [])

  // 당직 승인 반려 알림 푸시
  const pushDutyStatusNotification = async (userId: number, status: string) => {
    const userNotiRef = collection(notificationRef, `${userId}`, 'notiList')
    await addDoc(userNotiRef, {
      date: dayjs().format('YYYY-MM-DD'),
      message: `당직 신청이 ${status === 'APPROVE' ? '승인' : '반려'}되었습니다.`,
      status: status,
      type: '당직',
      read: false
    })
  }

  const getDutyListAll = () => {
    getDutyList().then(res => {
      const dutyWithKeys = res.data.dutyList.map(duty => ({
        ...duty,
        key: duty.id
      }))
      setDutyList(dutyWithKeys)
    })
  }

  const confirmApproval = (record: Duty) => {
    approveOrRejectDuty(1, record.id).then(getDutyListAll)
    pushDutyStatusNotification(record.userId, 'APPROVE')
    message.success('처리 완료')
  }
  const confirmRejection = (record: Duty) => {
    approveOrRejectDuty(2, record.id).then(getDutyListAll)
    pushDutyStatusNotification(record.userId, 'REJECT')
    message.success('처리 완료')
  }

  return (
    <Table
      columns={columns}
      dataSource={dutyList}
      sticky
      pagination={{
        position: ['bottomCenter'],
        pageSizeOptions: ['10', '20', '30', '40']
      }}
    />
  )
}
