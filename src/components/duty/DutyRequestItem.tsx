import React from 'react'
import { DUTY_MENU_ITEMS, REQUEST_STATUS, IDummyDutyRequest } from 'constants/index'
import { List, Tag, Dropdown, Typography } from 'antd'
import { styled } from 'styled-components'
import { EllipsisOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Text } = Typography

export const DutyRequestItem = React.memo(({ item }: { item: IDummyDutyRequest }) => {
  const onClickCancel: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`)
  }

  return (
    <List.Item>
      <ItemWrapper>
        <IconBox>⏰</IconBox>
        <StatusBox>
          <Tag bordered={false}>{REQUEST_STATUS[item.status]}</Tag>
        </StatusBox>
        <Date>{item.date}</Date>
        <Text style={{ flexGrow: 1 }}>{item.reason}</Text>
        <Dropdown menu={{ items: DUTY_MENU_ITEMS, onClick: onClickCancel }} trigger={['click']}>
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

const Date = styled.div`
  min-width: 100px;
`
