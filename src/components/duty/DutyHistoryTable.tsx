import React from 'react'
import { IDummyDutyRequest } from 'constants/index'
import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const { Text } = Typography

const getDutyHistoryColumns = (): ColumnsType<IDummyDutyRequest> => [
  {
    width: '40%',
    title: '당직 일자',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }) => (
      <StatusWrapper>
        <IconBox>⏰</IconBox>
        <span>{date}</span>
      </StatusWrapper>
    ),
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
      </ReasonCellWrapper>
    )
  }
]

type DutyHistoryTableProps = {
  historyList: IDummyDutyRequest[]
}

export const DutyHistoryTable = React.memo(
  ({ historyList: requestList }: DutyHistoryTableProps) => {
    const columns = getDutyHistoryColumns()

    return <Table columns={columns} dataSource={requestList} pagination={{ pageSize: 5 }} />
  }
)

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

const ReasonCellWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const ReasonText = styled(Text)`
  flex-grow: 1;
`
