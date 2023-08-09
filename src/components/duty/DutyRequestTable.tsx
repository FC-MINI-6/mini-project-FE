import React from 'react'
import { SkeletonTable } from 'components/index'
import { IDutyResponse } from 'types/index'
import { DUTY_MENU_ITEMS, REQUEST_STATUS, resultModalDatas } from 'constants/index'
import { deleteDuty } from 'apis/index'
import { modalStore } from 'stores/index'

import { EllipsisOutlined } from '@ant-design/icons'
import { Table, Tag, Dropdown, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { styled } from 'styled-components'

const { Text } = Typography

const getDutyRequestColumns = (menuClick: (id: number) => void): ColumnsType<IDutyResponse> => [
  {
    width: '20%',
    title: '신청 상태',
    dataIndex: 'status',
    align: 'center',
    key: 'stauts',
    render: (status: number) => (
      <StatusWrapper>
        <IconBox>⏰</IconBox>
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
    width: '20%',
    title: '당직 일자',
    dataIndex: 'date',
    align: 'center',
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
    align: 'center',
    key: 'reason',
    render: (_, { reason, id }) => (
      <ReasonCellWrapper>
        <ReasonText>{reason}</ReasonText>
        <Dropdown
          menu={{
            items: DUTY_MENU_ITEMS,
            onClick: () => {
              menuClick(id)
            }
          }}
          trigger={['click']}>
          <EllipsisOutlined style={{ marginRight: 10 }} />
        </Dropdown>
      </ReasonCellWrapper>
    )
  }
]

type DutyRequestTableProps = {
  requestList: IDutyResponse[]
  isLoading: boolean
  deleteCallback: () => void
}

export const DutyRequestTable = React.memo(
  ({ requestList, isLoading, deleteCallback }: DutyRequestTableProps) => {
    const { openModal } = modalStore()

    const onClickCancel = (id: number) => {
      openModal({
        ...resultModalDatas.DUTY_CANCEL_CONFIRM,
        okCallback: () => {
          deleteDuty(id).then(
            () => {
              deleteCallback()
            },
            error => {
              openModal({
                ...resultModalDatas.DUTY_CANCEL_FAILURE,
                content: `${resultModalDatas.DUTY_CANCEL_FAILURE.content}${error.message}`
              })
            }
          )
        }
      })
    }

    const columns = getDutyRequestColumns(onClickCancel)

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

const ReasonCellWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const ReasonText = styled(Text)`
  flex-grow: 1;
`
