import styled from "styled-components";

import Button from "./ui/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1;
  height: 100%;

  p {
    color: ${props => props.theme.colors.unSelectedText};
    font-size: 1.5rem;
  }

  button {
    background-color: ${props => props.theme.colors.buttonBorderColor};
    border: 1px solid hsla(0, 0%, 100%, .2);
    border-radius: 6px;
    color: ${props => props.theme.colors.unSelectedText};
    font-size: 1.4rem;
    font-weight: 500;
    height: 30px;
    margin-top: 21px;
    padding: 0 15px;
  }
`

type SearchInputListOffProps = {
  toggleAutoSave: () => void;
}

export default function SearchInputListOff({
  toggleAutoSave
}: SearchInputListOffProps) {
  return (
    <Container>
      <p>검색 저장 기능이 꺼져 있습니다.</p>
      <Button
        onClick={toggleAutoSave}
      >
        자동저장 켜기
      </Button>
    </Container>
  )
}
