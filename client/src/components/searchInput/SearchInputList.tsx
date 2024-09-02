import { Link } from "react-router-dom"

import styled from "styled-components"
import { RiSearchLine } from "react-icons/ri";

import SearchInputListOff from "./SearchInputListOff"

import Button from "../ui/Button"

import { key } from "../../utils"

const Container = styled.ul`
  flex: 1 1;
  overflow-y: auto;
  padding-top: 3px;
`

const SearchInputItem = styled.li`
  display: flex;
  justify-content: space-between;
  height: 42px;
  position: relative;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const SearchInputKeyword = styled.span`
  flex: 1;
  padding: 0 10px;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.67;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SearchInputRemoveButton = styled(Button)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 45px;

  &::before {
    content: '';
    position: absolute;
    right: 10px;
    height: 14px;
    width: 2px;
    background-color: ${props => props.theme.colors.unSelectedText};
    transform: rotate(45deg);
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    height: 14px;
    width: 2px;
    background-color: ${props => props.theme.colors.unSelectedText};
    transform: rotate(-45deg);
  }
`

type SearchInputListProps = {
  isAutoSave: boolean;
  keywordHistory: string[];
  toggleAutoSave: () => void;
  removeKeywordHistory: (index: number) => void;
}

export default function SearchInputList({
  isAutoSave, keywordHistory, toggleAutoSave, removeKeywordHistory
}: SearchInputListProps) {
  const handleClickDeleteKeyword = (index: number) => {
    removeKeywordHistory(index);
  }

  return (
    <Container>
      {isAutoSave
        ? (keywordHistory.map((keyword, index) => (
          <SearchInputItem key={key(keyword, index)}>
            <StyledLink to={`/search?query=${keyword}`}>
              <RiSearchLine size="15" color="#666" />
              <SearchInputKeyword>
                {keyword}
              </SearchInputKeyword>
            </StyledLink>
            <SearchInputRemoveButton
              onClick={() => handleClickDeleteKeyword(index)}
            />
          </SearchInputItem>
        )))
        : (
          <SearchInputListOff
            toggleAutoSave={toggleAutoSave}
          />
        )
      }
    </Container>
  )
}
