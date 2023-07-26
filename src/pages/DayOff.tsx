import { DayOffSummary } from 'components/index'
import { styled } from 'styled-components'

export const DayOff = () => {
  return (
    <Container>
      <Wapper>
        <h2>나의 연차</h2>
        <DayOffSummary />
      </Wapper>

      <Wapper>
        <h2>연차 신청 내역</h2>
      </Wapper>

      <Wapper>
        <h2>연차 사용 내역</h2>
      </Wapper>
    </Container>
  )
}

const Container = styled.section`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
`

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;

  &:first-child {
    flex-grow: 0.3;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`
