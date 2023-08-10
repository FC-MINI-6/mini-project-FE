import { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { addDoc, collection } from 'firebase/firestore'
import { notificationRef } from '@/firebase'
import dayjs from 'dayjs'
import { Table, Button, message, Popconfirm } from 'antd'
import { getDayOffList, approveOrRejectDayOff } from 'apis/index'
import { dayOffListStore, useUserStore } from 'stores/index'
import { DayOff } from 'types/index'
import { DAYOFF_TYPE } from 'constants/index'

export const ScheduleMgt = () => {
  const { userInfo } = useUserStore()
  const { dayOffList, setDayOffList } = dayOffListStore()

  const getTypeLabel = (type: number) => {
    switch (type) {
      case 0:
        return '연차'
      case 1:
        return '오전반차'
      case 2:
        return '오후반차'
      default:
        return ''
    }
  }

  const columns: ColumnsType<DayOff> = [
    {
      title: '이름',
      align: 'center',
      width: 40,
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left'
    },
    {
      title: '종류',
      align: 'center',
      width: 50,
      dataIndex: 'type',
      key: 'type',
      fixed: 'left',
      filters: [
        {
          text: '연차',
          value: 0
        },
        {
          text: '오전반차',
          value: 1
        },
        {
          text: '오후반차',
          value: 2
        }
      ],
      onFilter: (value: string | number | boolean, record: DayOff) => record.type === value,
      render: (type: number) => getTypeLabel(type)
    },
    {
      title: '시작일',
      align: 'center',
      width: 60,
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: DayOff, b: DayOff) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ['ascend'],
      fixed: 'left'
    },
    {
      title: '종료일',
      align: 'center',
      width: 60,
      dataIndex: 'endDate',
      key: 'endDate',
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
      onFilter: (value: string | number | boolean, record: DayOff) => record.status === value,
      defaultSortOrder: 'ascend',
      sorter: (a: DayOff, b: DayOff) => {
        if (a.status === 0 && b.status !== 0) {
          return -1
        } else if (a.status !== 0 && b.status === 0) {
          return 1
        } else {
          return a.status - b.status
        }
      },
      render: (record: DayOff) => (
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
    getScheduleListAll()
  }, [])

  // 휴가 승인 반려 알림 푸시
  const pushDayOffStatusNotification = async (userId: number, type: string, status: string) => {
    if (userInfo) {
      const userNotiRef = collection(notificationRef, `${userId}`, 'notiList')
      await addDoc(userNotiRef, {
        date: dayjs().format('YYYY-MM-DD'),
        message: `${type} 신청이 ${status === 'APPROVE' ? '승인' : '반려'}되었습니다.`,
        status: status,
        type: type,
        read: false
      })
    }
  }

  const getScheduleListAll = () => {
    getDayOffList().then(res => {
      const dayOffWithKeys = res.data.dayOffList.map(dayOff => ({
        ...dayOff,
        key: dayOff.id
      }))
      setDayOffList(dayOffWithKeys)
    })
  }

  const confirmApproval = (record: DayOff) => {
    approveOrRejectDayOff(1, record.id).then(getScheduleListAll)
    pushDayOffStatusNotification(record.userId, DAYOFF_TYPE[record.type], 'APPROVE')
    message.success('처리 완료')
  }
  const confirmRejection = (record: DayOff) => {
    approveOrRejectDayOff(2, record.id).then(getScheduleListAll)
    pushDayOffStatusNotification(record.userId, DAYOFF_TYPE[record.type], 'REJECT')
    message.success('처리 완료')
  }

  return (
    <Table
      columns={columns}
      dataSource={dayOffList}
      sticky
      pagination={{
        position: ['bottomCenter'],
        pageSizeOptions: ['10', '20', '30', '40']
      }}
    />
  )
}
