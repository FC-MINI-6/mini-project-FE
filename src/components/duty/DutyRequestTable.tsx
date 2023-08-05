import React from 'react'
import { SkeletonTable } from 'components/index'
import { IDutyResponse } from 'types/index'
import { DUTY_MENU_ITEMS, REQUEST_STATUS } from 'constants/index'
import { EllipsisOutlined } from '@ant-design/icons'
import { Table, Tag, Dropdown, Typography } from 'antd'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const { Text } = Typography

const getDutyRequestColumns = (menuClick: MenuProps['onClick']): ColumnsType<IDutyResponse> => [
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
          <EllipsisOutlined style={{ marginRight: 10 }} />
        </Dropdown>
      </ReasonCellWrapper>
    )
  }
]

type DutyRequestTableProps = {
  requestList: IDutyResponse[]
  isLoading: boolean
}

export const DutyRequestTable = React.memo(({ requestList, isLoading }: DutyRequestTableProps) => {
  const onClickCancel: MenuProps['onClick'] = () => {
    // TODO : 신청 취소 기능
  }

  const columns = getDutyRequestColumns(onClickCancel)

  return (
    <SkeletonTable loading={isLoading} columns={columns as ColumnsType<IDutyResponse[]>}>
      <Table
        size="middle"
        columns={columns}
        dataSource={requestList}
        pagination={{ pageSize: 5 }}
      />
    </SkeletonTable>
  )
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
  margin-left: 10px;
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
