import React from 'react'
import { DAYOFF_MENU_ITEMS } from 'constants/index'
import { SkeletonTable } from 'components/index'
import { IDayOffResponse } from 'types/index'
import { calcNumOfDayOff } from 'utils/index'

import { EllipsisOutlined } from '@ant-design/icons'
import { Table, Tag, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const getDayOffRequestColumns = (menuClick: MenuProps['onClick']): ColumnsType<IDayOffResponse> => [
  {
    width: '15%',
    title: '신청 상태',
    dataIndex: 'status',
    key: 'stauts',
    render: (status: string) => (
      <StatusWrapper>
        <IconBox>🏖️</IconBox>
        <StatusBox>
          <Tag
            bordered={false}
            color={status === '반려' ? 'error' : 'default'}
            style={{ minWidth: 60, textAlign: 'center' }}>
            {status}
          </Tag>
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
    sorter: (a, b) => a.status.length - b.status.length
  },
  {
    width: '15%',
    title: '휴가 타입',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => (
      <Type>
        <Tag color="green" style={{ minWidth: 60, textAlign: 'center' }}>
          {type}
        </Tag>
      </Type>
    ),
    filters: [
      {
        text: '연차',
        value: '연차'
      },
      {
        text: '오전반차',
        value: '오전반차'
      },
      {
        text: '오후반차',
        value: '오후반차'
      }
    ],
    onFilter: (value, { type }) => type === value
  },
  {
    width: '70%',
    title: '휴가 일자',
    dataIndex: ['startDate', 'endDate'],
    key: 'date',
    render: (_, { startDate, endDate, type }) => (
      <DateCellWrapper>
        <DateWrapper>
          {startDate}
          {endDate ? ` ~ ${endDate}` : ''}
        </DateWrapper>
        <Tag bordered={false} style={{ minWidth: 45, textAlign: 'center' }}>
          {type === '연차' ? calcNumOfDayOff(startDate, endDate!) : 0.5}일
        </Tag>
        <Dropdown menu={{ items: DAYOFF_MENU_ITEMS, onClick: menuClick }} trigger={['click']}>
          <EllipsisOutlined style={{ marginRight: 10 }} />
        </Dropdown>
      </DateCellWrapper>
    ),
    sorter: (a, b) => {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    }
  }
]

type DayOffRequestTableProps = {
  requestList: IDayOffResponse[]
  isLoading: boolean
}

export const DayOffRequestTable = React.memo(
  ({ requestList, isLoading }: DayOffRequestTableProps) => {
    const onClickCancel: MenuProps['onClick'] = () => {
      // TODO : 신청 취소 기능
    }

    const columns = getDayOffRequestColumns(onClickCancel)

    return (
      <SkeletonTable loading={isLoading} columns={columns as ColumnsType<IDayOffResponse[]>}>
        <Table
          size="middle"
          columns={columns}
          dataSource={requestList}
          pagination={{ pageSize: 5 }}
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

const DateCellWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const DateWrapper = styled.div`
  flex-grow: 1;
`
