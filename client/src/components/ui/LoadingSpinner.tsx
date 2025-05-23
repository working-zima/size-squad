import styled from 'styled-components';

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1000;
`;

const Spinner = styled.div`
  display: block;
  margin: 0 auto;

  &::before {
    content: '';
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 6px solid ${(props) => props.theme.colors.buttonBorderColor};
    border-color: ${(props) => props.theme.colors.buttonBorderColor} transparent
      ${(props) => props.theme.colors.buttonBorderColor} transparent;
    animation: rotate 1.2s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function LoadingSpinner() {
  return (
    <LoadingWrap>
      <Spinner />
    </LoadingWrap>
  );
}
