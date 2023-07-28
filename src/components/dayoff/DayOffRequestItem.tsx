import React from 'react'
import { DummyDayOffItem } from 'pages/index'
import { List, Tag, Dropdown } from 'antd'
import { styled } from 'styled-components'
import { EllipsisOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

export const DayOffRequestItem = React.memo(({ item }: { item: DummyDayOffItem }) => {
  const onClickCancel: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`)
  }

  const items: MenuProps['items'] = [
    {
      label: '연차 취소하기',
      key: '1'
    }
  ]

  return (
    <List.Item>
      <ItemWrapper>
        <IconBox>🏖️</IconBox>
        <StatusBox>
          <Tag bordered={false}>{item.status}</Tag>
        </StatusBox>
        <Type>
          <Tag color="green">{item.type}</Tag>
        </Type>
        <Date>{item.startDate}</Date>
        <Tag bordered={false}>1일</Tag>
        <Dropdown menu={{ items, onClick: onClickCancel }} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      </ItemWrapper>
    </List.Item>
  )
})

const ItemWrapper = styled.div`
  width: 100%;
  height: 40px;
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

const Date = styled.div`
  flex-grow: 1;
`
