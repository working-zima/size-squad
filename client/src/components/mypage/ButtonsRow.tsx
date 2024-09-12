import { Link } from "react-router-dom";

import styled from "styled-components";

import Button from "../ui/Button";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  user-select: none;

  button {
    width: 100%;
    height: 34px;
    padding: 0;
    margin-left: 4px;
    background-color: ${props => props.theme.colors.primaryWhite};
    color: ${props => props.theme.colors.primaryBlack};
    border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
    border-radius: 4px;
    -webkit-tap-highlight-color: transparent;
  }

  & > button:first-of-type {
      margin-left: 0px;
  }
`

const LinkButton = styled.div`
  width: 100%;
  height: 100%;
  height: 34px;
  padding: 0;
  margin-right: 4px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.colors.primaryWhite};
  color: ${props => props.theme.colors.primaryBlack};
  border: 1px solid ${(props) => props.theme.colors.buttonBorderColor};
  border-radius: 4px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

type ButtonsRowProps = {
  userId: string | undefined;
  isOwner: boolean;
  handleClickLogout: () => void;
}

export default function ButtonsRow({
  isOwner, userId, handleClickLogout
}: ButtonsRowProps) {
  return (
    <Container>
      {isOwner &&
        <>
          <LinkButton>
            <Link to={`/mypage/${userId}/edit`}>
              회원정보 변경
            </Link>
          </LinkButton>
          <Button onClick={handleClickLogout}>
            로그아웃
          </Button>
        </>
      }
    </Container>
  )
}