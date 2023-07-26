import React from 'react'
import { styled } from 'styled-components'

export const DayOff = () => {
  return (
    <Container>
      <h2>나의 연차</h2>
      <h2>연차 신청 내역</h2>
      <h2>연차 사용 내역</h2>
    </Container>
  )
}

const Container = styled.section`
  padding: 40px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`
