import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

import styled from "styled-components"

import SearchInputHeader from "./SearchInputHeader"
import SearchInputList from "./SearchInputList"

import Button from "./ui/Button"

import { useKeywordHistory } from "../hooks/useKeywordHistory"

const SearchInputBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  max-width: 768px;
  height: calc(100vh - 50px);
  overflow: hidden;
  padding-top: 0.4rem;
`

const SearchInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  padding-top: 0.4rem;

  button, p {
    padding: 0;
    font-size: 1.3rem;
    color: ${(props) => props.theme.colors.unSelectedText};
  }
`

type SearchInputProps = {
  headerOpened: boolean;
  bodyOpened: boolean;
  hideHeader: () => void;
  hideBody: () => void;
  openBody?: () => void;
  isInitialOpen?: boolean;
}

export default function SearchInput({
  headerOpened,
  bodyOpened,
  hideHeader,
  hideBody,
  openBody,
  isInitialOpen = false,
}: SearchInputProps) {
  const portalRoot = document.querySelector('#portalRoot')!;

  const [isFocused, setIsFocused] = useState(false);
  const [isAutoSave, setIsAutoSave] = useState(true);

  const {
    keywordHistory, addKeywordHistory, removeKeywordHistory, clearHistory
  } = useKeywordHistory()

  useEffect(() => {
    if (headerOpened && (isFocused || isInitialOpen)) {
      openBody?.();
    }
  }, [isFocused, headerOpened, isInitialOpen, openBody]);

  const handleClickDelete = () => {
    clearHistory();
  }

  return (
    <>
      {headerOpened && createPortal(
        <SearchInputHeader
          isAutoSave={isAutoSave}
          hideHeader={hideHeader}
          hideBody={hideBody}
          setIsFocused={setIsFocused}
          addKeywordHistory={addKeywordHistory}
        />,
        portalRoot
      )}
      {bodyOpened && createPortal(
        <SearchInputBody>
          <SearchInputBox>
            <p>최근 검색어</p>
            <Button
              onClick={handleClickDelete}
            >
              전체 삭제
            </Button>
          </SearchInputBox>
          <SearchInputList
            isAutoSave={isAutoSave}
            keywordHistory={keywordHistory}
            setIsAutoSave={setIsAutoSave}
            removeKeywordHistory={removeKeywordHistory}
          />
          <SearchInputBox>
            <Button onClick={() => setIsAutoSave(prev => !prev)}>
              자동저장 끄기
            </Button>
            <Button onClick={hideBody}>
              닫기
            </Button>
          </SearchInputBox>
        </SearchInputBody>,
        portalRoot
      )}
    </>
  )
}
