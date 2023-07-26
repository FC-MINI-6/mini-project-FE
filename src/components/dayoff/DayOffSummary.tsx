import React from 'react'
import { MyDayOffCount } from 'components/index'
import { dayOffTypes } from 'constants/index'

import { Col, Row } from 'antd'
import { globalToken } from '@/GlobalThemeConfig'

export const DayOffSummary = React.memo(() => {
  return (
    <Row style={{ flexGrow: 0.7, border: `1px solid ${globalToken.colorBorder}`, borderRadius: 6 }}>
      <Col span={8}>
        <MyDayOffCount type={dayOffTypes.AVAILABLE} day={11} />
      </Col>
      <Col span={8}>
        <MyDayOffCount type={dayOffTypes.EXTINCTION} day={0} />
      </Col>
      <Col span={8}>
        <MyDayOffCount type={dayOffTypes.USED} day={4} />
      </Col>
    </Row>
  )
})
