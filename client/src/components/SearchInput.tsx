import { createPortal } from "react-dom"

import styled from "styled-components"

import SearchInputHeader from "./SearchInputHeader"

import Button from "./ui/Button"
import { useEffect, useState } from "react"

const SearchInputBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  padding-top: 4px;
`

const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  justify-content: space-between;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.unSelectedText};
`

const SearchInputList = styled.ul`
  flex: 1 1;
  overflow-y: auto;
  padding-top: 3px;
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

  useEffect(() => {
    if (headerOpened) {
      if (isFocused || isInitialOpen) {
        openBody?.();
      } else {
        hideBody();
      }
    }
  }, [isFocused, headerOpened, isInitialOpen, openBody, hideBody]);

  return (
    <>
      {headerOpened && createPortal(
        <SearchInputHeader
          hide={hideHeader}
          setIsFocused={setIsFocused}
        />,
        portalRoot
      )}

      {bodyOpened && createPortal(
        <SearchInputBody>
          <SearchInputBox>최근 검색어</SearchInputBox>
          <SearchInputList>안녕</SearchInputList>
          <SearchInputBox>
            자동저장 끄기
            <Button onClick={hideBody}>닫기</Button>
          </SearchInputBox>
        </SearchInputBody>,
        portalRoot
      )}
    </>
  )
}
