import { Link } from 'react-router-dom';

import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;

  a {
    color: ${props => props.theme.colors.unSelectedText};
    text-decoration-line: underline;
    text-underline-offset: 1.5px;
  }
`

type LoginUtils = {
  error: boolean;
}

export function LoginUtils({error}: LoginUtils) {
  return (
    <>
        {error && (
      <>
        <p>로그인 실패</p>
        <div>{error}</div>
      </>
    )}
    <ButtonWrapper>
      <p>
        <Link to="/signup">
          회원 가입
        </Link>
      </p>
    </ButtonWrapper>
    </>
  )
}