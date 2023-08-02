import React from 'react'
import { DAYOFF_MENU_ITEMS, DUMMY_DAYOFF_REQUEST_LIST } from 'constants/index'
import { IDayOffResponse } from 'types/index'

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
          <Tag bordered={false}>{status}</Tag>
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
        <Tag color="green">{type}</Tag>
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
    render: (_, { startDate, endDate }) => (
      <DateCellWrapper>
        <DateWrapper>
          {startDate}
          {endDate ? ` ~ ${endDate}` : ''}
        </DateWrapper>
        <Tag bordered={false}>1일</Tag>
        <Dropdown menu={{ items: DAYOFF_MENU_ITEMS, onClick: menuClick }} trigger={['click']}>
          <EllipsisOutlined />
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
}

export const DayOffRequestTable = React.memo(({ requestList }: DayOffRequestTableProps) => {
  const onClickCancel: MenuProps['onClick'] = ({ key }) => {
    // TODO : 신청 취소 기능
  }

  const columns = getDayOffRequestColumns(onClickCancel)

  return <Table columns={columns} dataSource={DUMMY_DAYOFF_REQUEST_LIST} />
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
