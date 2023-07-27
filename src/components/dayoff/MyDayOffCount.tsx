import React from 'react'
import { TDayOffTypes } from 'constants/index'

import { styled } from 'styled-components'

type TMyDayOffCountProps = {
  type: TDayOffTypes
  day: number
}

export const MyDayOffCount = React.memo(({ type, day }: TMyDayOffCountProps) => {
  return (
    <DayOffCount type={type} day={day}>
      <h4>{type.title}</h4>
      <div>{day ? `${type.operator} ${day}일` : '없음'}</div>
    </DayOffCount>
  )
})

const DayOffCount = styled.div<TMyDayOffCountProps>`
  height: 100%;

  ${({ type }) =>
    type.type === 'EXTINCTION' &&
    'border-left: 1px solid var(--color-border); border-right: 1px solid var(--color-border);'}

  h4 {
    font-size: 15px;
    padding: 8px 8px 8px 16px;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 3px;

      position: absolute;
      top: 6px;
      left: 8px;
      bottom: 6px;
      background-color: ${({ type }) => type.color};
    }
  }

  div {
    color: ${({ type, day }) => (day !== 0 ? type.color : '#999')};
    font-size: 18px;
    font-weight: 700;
    padding: 4px 10px 16px;
  }
`
