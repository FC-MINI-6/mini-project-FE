import React from 'react'
import { MyDayOffCount } from 'components/index'
import { dayOffTypes } from 'constants/index'

import { Col, Row } from 'antd'
import { globalToken } from '@/GlobalThemeConfig'

type TDayOffSummaryProps = {
  available: number
  used: number
}

export const DayOffSummary = React.memo(({ available, used }: TDayOffSummaryProps) => {
  return (
    <Row
      style={{
        flexGrow: 0.7,
        border: `1px solid ${globalToken.colorBorder}`,
        borderRadius: 6,
        flexShrink: 0
      }}>
      <Col span={8}>
        <MyDayOffCount type={dayOffTypes.AVAILABLE} day={available} />
      </Col>
      <Col span={8}>
        <MyDayOffCount type={dayOffTypes.EXTINCTION} day={0} />
      </Col>
      <Col span={8}>
        <MyDayOffCount type={dayOffTypes.USED} day={used} />
      </Col>
    </Row>
  )
})
