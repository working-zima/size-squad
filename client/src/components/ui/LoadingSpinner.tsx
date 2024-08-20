import styled from "styled-components"

const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0002;
  z-index: 1000;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid ${props => props.theme.colors.primaryWhite};
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const TextWrapper = styled.div`
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 2rem;
  color: ${props => props.theme.colors.primaryWhite};
`

export default function LoadingSpinner() {
  return (
    <LoadingWrap>
      <Spinner />
      <TextWrapper>
        <p>로딩 중...</p>
      </TextWrapper>
    </LoadingWrap>
  )
}
