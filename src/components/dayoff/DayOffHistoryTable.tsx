import React from 'react'
import { IDayOffResponse } from 'types/index'
import { SkeletonTable } from 'components/index'
import { calcNumOfDayOff, colorOfType } from 'utils/index'
import { REQUEST_STATUS, DAYOFF_TYPE } from 'constants/index'

import { Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const { Text } = Typography

const getDayOffHistoryColumns = (): ColumnsType<IDayOffResponse> => [
  {
    width: '15%',
    title: '신청 상태',
    dataIndex: 'status',
    align: 'center',
    key: 'stauts',
    render: (status: number) => (
      <StatusWrapper>
        <IconBox>🏖️</IconBox>
        <StatusBox>
          <Tag bordered={false} style={{ minWidth: 60, textAlign: 'center' }}>
            {REQUEST_STATUS[status]}
          </Tag>
        </StatusBox>
      </StatusWrapper>
    ),
    filters: [
      {
        text: '승인대기',
        value: 0
      },
      {
        text: '승인',
        value: 1
      },
      {
        text: '반려',
        value: 2
      }
    ],
    onFilter: (value, { status }) => status === value,
    sorter: (a, b) => a.status - b.status
  },
  {
    width: '15%',
    title: '휴가 타입',
    dataIndex: 'type',
    align: 'center',
    key: 'type',
    render: (type: number) => (
      <Type>
        <Tag color={colorOfType(type)} style={{ minWidth: 60, textAlign: 'center' }}>
          {DAYOFF_TYPE[type]}
        </Tag>
      </Type>
    ),
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
    onFilter: (value, { type }) => type === value
  },
  {
    width: '30%',
    title: '휴가 일자',
    dataIndex: ['startDate', 'endDate'],
    align: 'center',
    key: 'date',
    render: (_, { startDate, endDate }) => (
      <span>
        {startDate}
        {endDate ? ` ~ ${endDate}` : ''}
      </span>
    ),
    sorter: (a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    }
  },
  {
    width: '40%',
    title: '사유',
    dataIndex: 'reason',
    align: 'center',
    key: 'reason',
    render: (_, { reason, type, endDate, startDate }) => (
      <ReasonCellWrapper>
        <ReasonText>{reason}</ReasonText>
        <Tag bordered={false} style={{ minWidth: 45, textAlign: 'center', marginRight: 10 }}>
          {type === 0 ? calcNumOfDayOff(startDate, endDate!) : 0.5}일
        </Tag>
      </ReasonCellWrapper>
    )
  }
]

type DayOffHistorytTableProps = {
  historyList: IDayOffResponse[]
  isLoading: boolean
}

export const DayOffHistorytTable = React.memo(
  ({ historyList, isLoading }: DayOffHistorytTableProps) => {
    const columns = getDayOffHistoryColumns()

    return (
      <SkeletonTable
        loading={isLoading}
        rowKey={(_, index) => {
          return `key ${index}`
        }}
        columns={columns as ColumnsType<IDayOffResponse[]>}>
        <Table
          rowKey={render => render.id}
          size="middle"
          columns={columns}
          dataSource={historyList}
        />
      </SkeletonTable>
    )
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
  margin-left: 10px;
`

const StatusBox = styled.div`
  min-width: 80px;
  display: flex;
  justify-content: center;
`

const Type = styled.div`
  min-width: 80px;
`

const ReasonCellWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const ReasonText = styled(Text)`
  flex-grow: 1;
`
