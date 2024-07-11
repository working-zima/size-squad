import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { CiCircleCheck } from "react-icons/ci";

import Divider from "../components/ui/Divider";
import Button from "../components/ui/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  height: calc(100vh - 150px);

  h1 {
    display: flex;
    justify-content: center;
    font-size: 4.8rem;
    margin-bottom: 2.8rem;
  }

  p {
    line-height: 22px;
    text-align: center;
  }
`

const CheckMark = styled.div`
  font-size: 48px;
  margin: 1rem;
  color: ${props => props.theme.colors.PrimaryBlue};
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
  width: 100%;

  button {
    height: 40px;
    border: 1px solid ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;
    font-size: 1.6rem;
    font-weight: bold;
    width: 100%;
  }

  button:nth-child(2) {
    background-color: ${props => props.theme.colors.primaryBlack};
    color: white;
  }
`;

export default function SignupCompletePage() {
  const navigate = useNavigate();

  const navegateHomeHandler = () => {
    navigate("/");
  }

  const navegateLogInHandler = () => {
    navigate("/login")
  }

  return (
    <Container>
      <CheckMark>
        <CiCircleCheck/>
      </CheckMark>
      <h1>회원가입 완료</h1>
      <p>회원가입이 성공적으로 완료되었습니다.<br/>로그인 후 이용해주세요.</p>
      <Divider>
        이동
      </Divider>
      <ButtonContainer>
        <Button onClick={navegateHomeHandler}>홈으로</Button>
        <Button onClick={navegateLogInHandler}>로그인</Button>
      </ButtonContainer>
    </Container>
  );
}
