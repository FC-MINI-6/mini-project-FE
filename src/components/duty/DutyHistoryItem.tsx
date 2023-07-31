import React from 'react'
import { IDummyDutyRequest } from 'constants/index'
import { List, Typography } from 'antd'
import { styled } from 'styled-components'

const { Text } = Typography

export const DutyHistoryItem = React.memo(({ item }: { item: IDummyDutyRequest }) => {
  return (
    <List.Item>
      <ItemWrapper>
        <IconBox>⏰</IconBox>
        <Date>{item.date}</Date>
        <Text style={{ flexGrow: 1 }}>{item.reason}</Text>
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

const Date = styled.div`
  min-width: 100px;
`
