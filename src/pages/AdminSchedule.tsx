import { DutyMgt, ScheduleMgt } from 'components/index'
import { styled } from 'styled-components'
export const AdminSchedule = () => {
  return (
    <Wrapper>
      <Container>
        <h2>휴가 신청 내역</h2>
        <ScheduleMgt />
      </Container>
      <Container>
        <h2>당직 신청 내역</h2>
        <DutyMgt />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  min-height: calc(100% - 62px);
`

const Container = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`
