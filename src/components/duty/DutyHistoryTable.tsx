import React from 'react'
import { SkeletonTable } from 'components/index'
import { IDutyResponse } from 'types/index'
import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const { Text } = Typography

const getDutyHistoryColumns = (): ColumnsType<IDutyResponse> => [
  {
    width: '40%',
    title: '당직 일자',
    dataIndex: 'date',
    align: 'center',
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
    align: 'center',
    key: 'reason',
    render: (_, { reason }) => (
      <ReasonCellWrapper>
        <ReasonText>{reason}</ReasonText>
      </ReasonCellWrapper>
    )
  }
]

type DutyHistoryTableProps = {
  historyList: IDutyResponse[]
  isLoading: boolean
}

export const DutyHistoryTable = React.memo(({ historyList, isLoading }: DutyHistoryTableProps) => {
  const columns = getDutyHistoryColumns()

  return (
    <SkeletonTable
      loading={isLoading}
      rowKey={(_, index) => {
        return `key ${index}`
      }}
      columns={columns as ColumnsType<IDutyResponse[]>}>
      <Table
        rowKey={render => render.id}
        size="middle"
        columns={columns}
        dataSource={historyList}
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

const ReasonCellWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 10px;
`

const ReasonText = styled(Text)`
  flex-grow: 1;
`
