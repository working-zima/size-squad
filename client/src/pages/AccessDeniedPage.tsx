import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
`;

const MessageBox = styled.div`
  text-align: center;
  padding: 10px;

  h1 {
    font-size: 3.6rem;
    margin-bottom: 2.8rem;
    color: ${props => props.theme.colors.primaryBlack};
  }

  p {
    font-size: 1.2em;
    line-height: 22px;
    margin-bottom: 30px;
    color: ${props => props.theme.colors.unSelectedText};
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.6rem;
  font-weight: bold;
  color: white;
  background-color: ${props => props.theme.colors.primaryBlack};
  border-radius: 6px;
`;

export default function AccessDeniedPage() {
  return (
    <Container>
    <MessageBox>
      <h1>로그인이 필요합니다</h1>
      <p>서비스 이용을 위해 로그인이 필요합니다.<br/>로그인 후 이용해 주세요.</p>
      <LoginButton href="/login">로그인</LoginButton>
    </MessageBox>
  </Container>
  )
}
