import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

const Container = styled(Button)`
  position: relative;
  display: flex;
  padding: 0;
  width: 40px;
  cursor: pointer;
  z-index: 10;
`;

type BackSpaceProps = {
  children: JSX.Element
}

export default function BackSpace({ children }: BackSpaceProps) {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <Container onClick={onClickBtn}>
      {children}
    </Container>
  );
}
