import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/ui/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    background-color: ${(props) => props.theme.colors.primaryBlack};
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

type NoListPageProps = {
  itemName: string;
  itemLink: string;
};

export default function NoListPage({ itemName, itemLink }: NoListPageProps) {
  return (
    <Container>
      <MessageBox>
        <h2>{itemName}가 없습니다</h2>
        <p>{itemName}를 채워 주세요.</p>
      </MessageBox>
      <Link to={itemLink}>
        <Button>{itemName} 채우러 가기</Button>
      </Link>
    </Container>
  );
}
