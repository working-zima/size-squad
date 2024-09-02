import { Dispatch, FormEvent, MouseEvent, SetStateAction, useRef } from "react"
import { useNavigate } from "react-router-dom"

import styled from 'styled-components'
import { LiaAngleLeftSolid } from 'react-icons/lia'

import Button from "../ui/Button"
import { SearchTextInputBox } from '../ui/textbox/TextBoxComponents'

import useProductsStore from '../../hooks/useProductsStore'

const Container = styled.header`
  display: flex;
  flex-basis: 50px;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 10px 6px 10px;
  width: 100%;
  max-width: 768px;
  height: 50px;
  background-color: ${props => props.theme.colors.primaryWhite};
  color: ${props => props.theme.colors.unSelectedText};

  form {
    width: 100%;
    height: 100%;
  }

  button {
    display: flex;
    padding: 0;
  }
`

type SearchInputProps = {
  isAutoSave: boolean;
  hideHeader: () => void;
  hideBody: () => void;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  addKeywordHistory: (value: string) => void;
}

export default function SearchInputHeader({
  isAutoSave, hideHeader, hideBody, setIsFocused, addKeywordHistory
}: SearchInputProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ keyword }, store] = useProductsStore()

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword === '') return;
    if (inputRef.current) inputRef.current.blur();
    if (isAutoSave) addKeywordHistory(keyword);
    setIsFocused(false);
    hideBody();
    navigate(`/search?query=${encodeURIComponent(keyword)}`);
  }

  const handleClick = () => {
    navigate('/mysize');
    hideHeader();
    hideBody();
    store.resetKeyword();
    store.fetchInitialProducts({});
  }

  return (
    <Container onClick={stopPropagation}>
      <Button onClick={handleClick}>
        <LiaAngleLeftSolid size="24" />
      </Button>
      <form onSubmit={handleSubmit}>
        <SearchTextInputBox
          ref={inputRef}
          value={keyword}
          placeholder="브랜드, 제품명으로 검색하세요"
          maxLength={100}
          setIsFocused={setIsFocused}
          onChange={(value) => store.changeKeyword(value)}
          onReset={() => store.resetKeyword()}
        />
      </form>
    </Container>
  )
}
