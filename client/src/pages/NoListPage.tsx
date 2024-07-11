import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Button from '../components/ui/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);

  button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    background-color: ${props => props.theme.colors.primaryBlack};
    border-radius: 6px;
  }
`;

const MessageBox = styled.div`
  text-align: center;
  padding: 10px;

  h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
  }

  p {
    font-size: 1.2em;
    margin-bottom: 30px;
    color: #666;
  }
`;

export default function NoListPage() {

  return (
    <Container>
      <MessageBox>
        <h2>입력된 사이즈가 없습니다</h2>
        <p>서비스 이용을 위해 사이즈를 입력해 주세요.</p>
      </MessageBox>
      <Link to='/mysize/new'>
        <Button>
          사이즈 입력
        </Button>
      </Link>
    </Container>
  );
};
