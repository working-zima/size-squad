import styled from 'styled-components'

const Container = styled.div``

export default function NetworkErrorPage() {
  return (
    <Container>
      <h1>네트워크 오류가 발생했습니다.</h1>
      <p>잠시 후에 다시 시도해 주세요.</p>
    </Container>
  )
}
