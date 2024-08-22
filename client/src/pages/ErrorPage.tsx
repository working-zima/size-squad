import { Link } from 'react-router-dom';
import styled from 'styled-components'
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
  }`

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

export default function ErrorPage({
  errorMessage
}: { errorMessage?: string }) {
  return (
    <Container>
      <MessageBox>
        <h2>{errorMessage}</h2>
        <p>새로고침 하거나 잠시 후에 다시 시도해 주세요.</p>
      </MessageBox>
      <Link to='/'>
        <Button>
          홈으로
        </Button>
      </Link>
    </Container>
  )
}
