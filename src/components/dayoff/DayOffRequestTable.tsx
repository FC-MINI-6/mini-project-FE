import React from 'react'
import { DAYOFF_MENU_ITEMS, REQUEST_STATUS, DAYOFF_TYPE, resultModalDatas } from 'constants/index'
import { SkeletonTable } from 'components/index'
import { IDayOffResponse } from 'types/index'
import { calcNumOfDayOff, colorOfType } from 'utils/index'
import { deleteDayOff } from 'apis/index'
import { modalStore } from 'stores/index'

import { EllipsisOutlined } from '@ant-design/icons'
import { Table, Tag, Dropdown } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const getDayOffRequestColumns = (menuClick: (id: number) => void): ColumnsType<IDayOffResponse> => [
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
          <Tag
            bordered={false}
            color={status === 2 ? 'error' : 'default'}
            style={{ minWidth: 60, textAlign: 'center' }}>
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
    width: '70%',
    title: '휴가 일자',
    dataIndex: ['startDate', 'endDate'],
    align: 'center',
    key: 'date',
    render: (_, { startDate, endDate, type, id }) => (
      <DateCellWrapper>
        <DateWrapper>
          {startDate}
          {endDate ? ` ~ ${endDate}` : ''}
        </DateWrapper>
        <Tag bordered={false} style={{ minWidth: 45, textAlign: 'center' }}>
          {type === 0 ? calcNumOfDayOff(startDate, endDate!) : 0.5}일
        </Tag>
        <Dropdown
          menu={{
            items: DAYOFF_MENU_ITEMS,
            onClick: () => {
              menuClick(id)
            }
          }}
          trigger={['click']}>
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
  deleteCallback: () => void
}

export const DayOffRequestTable = React.memo(
  ({ requestList, isLoading, deleteCallback }: DayOffRequestTableProps) => {
    const { openModal } = modalStore()

    const onClickCancel = (id: number) => {
      openModal({
        ...resultModalDatas.DAYOFF_CANCEL_CONFIRM,
        okCallback: () => {
          deleteDayOff(id).then(
            () => {
              deleteCallback()
            },
            error => {
              openModal({
                ...resultModalDatas.DAYOFF_CANCEL_FAILURE,
                content: `${resultModalDatas.DAYOFF_CANCEL_FAILURE.content}${error.message}`
              })
            }
          )
        }
      })
    }

    const columns = getDayOffRequestColumns(onClickCancel)

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
