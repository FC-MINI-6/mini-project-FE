import { EmployeeMgt } from 'components/index'
import { styled } from 'styled-components'

export const AdminEmployee = () => {
  return (
    <Wrapper>
      <Container>
        <h2>사원 관리</h2>
        <EmployeeMgt />
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
