import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const CustomButton = styled(Button)`
  border: none;
  height: 100%;
  margin: 0 0.4rem;
  padding: 0;
  font-size: 30px;
`;

export default function BackSpace() {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <CustomButton onClick={onClickBtn}>
      &lt;
    </CustomButton>
  );
}
