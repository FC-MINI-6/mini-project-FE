import React from 'react'
import { DUTY_MENU_ITEMS, REQUEST_STATUS, IDummyDutyRequest } from 'constants/index'
import { EllipsisOutlined } from '@ant-design/icons'
import { Table, Tag, Dropdown, Typography } from 'antd'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const { Text } = Typography

const getDutyRequestColumns = (menuClick: MenuProps['onClick']): ColumnsType<IDummyDutyRequest> => [
  {
    width: '20%',
    title: '신청 상태',
    dataIndex: 'status',
    key: 'stauts',
    render: (status: number) => (
      <StatusWrapper>
        <IconBox>⏰</IconBox>
        <StatusBox>
          <Tag bordered={false}>{REQUEST_STATUS[status]}</Tag>
        </StatusBox>
      </StatusWrapper>
    ),
    filters: [
      {
        text: '승인대기',
        value: '승인대기'
      },
      {
        text: '승인',
        value: '승인'
      },
      {
        text: '반려',
        value: '반려'
      }
    ],
    onFilter: (value, { status }) => status === value,
    sorter: (a, b) => a.status - b.status
  },
  {
    width: '20%',
    title: '당직 일자',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }) => <span>{date}</span>,
    sorter: (a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  },
  {
    width: '60%',
    title: '사유',
    dataIndex: 'reason',
    key: 'reason',
    render: (_, { reason }) => (
      <ReasonCellWrapper>
        <ReasonText>{reason}</ReasonText>
        <Dropdown menu={{ items: DUTY_MENU_ITEMS, onClick: menuClick }} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      </ReasonCellWrapper>
    )
  }
]

type DutyRequestTableProps = {
  requestList: IDummyDutyRequest[]
}

export const DutyRequestTable = React.memo(({ requestList }: DutyRequestTableProps) => {
  const onClickCancel: MenuProps['onClick'] = ({ key }) => {
    // TODO : 신청 취소 기능
  }

  const columns = getDutyRequestColumns(onClickCancel)

  return <Table columns={columns} dataSource={requestList} pagination={{ pageSize: 5 }} />
})

const StatusWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
`

const StatusBox = styled.div`
  min-width: 80px;
  display: flex;
  justify-content: center;
`

const ReasonCellWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const ReasonText = styled(Text)`
  flex-grow: 1;
`
