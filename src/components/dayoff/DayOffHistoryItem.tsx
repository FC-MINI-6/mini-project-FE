import React from 'react'
import { DummyDayOffItem } from 'pages/index'
import { List, Tag } from 'antd'
import { styled } from 'styled-components'
export const DayOffHistorytItem = React.memo(({ item }: { item: DummyDayOffItem }) => {
  return (
    <List.Item>
      <ItemWrapper>
        <IconBox>🏖️</IconBox>
        <Type>{item.type}</Type>
        <Date>{item.startDate}</Date>
        <Tag bordered={false}>1일</Tag>
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
const Type = styled.div`
  min-width: 60px;
`

const Date = styled.div`
  flex-grow: 1;
`
