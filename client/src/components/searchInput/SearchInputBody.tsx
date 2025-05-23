import styled from 'styled-components';

import Button from '../ui/Button';
import SearchInputList from './SearchInputList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  max-width: 768px;
  height: calc(100vh - 50px);
  overflow: hidden;
  padding-top: 0.4rem;
`;

const SearchInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  padding-top: 0.4rem;

  button,
  p {
    padding: 0;
    font-size: 1.3rem;
    color: ${(props) => props.theme.colors.unSelectedText};
  }
`;

type SearchInputBodyProps = {
  keywordHistory: string[];
  isAutoSave: boolean;
  toggleAutoSave: () => void;
  removeKeywordHistory: (index: number) => void;
  handleClickDeleteAllHistory: () => void;
  hideBody: () => void;
};

export default function SearchInputBody({
  keywordHistory,
  isAutoSave,
  toggleAutoSave,
  removeKeywordHistory,
  handleClickDeleteAllHistory,
  hideBody,
}: SearchInputBodyProps) {
  return (
    <Container>
      <SearchInputBox>
        <p>최근 검색어</p>
        <Button onClick={handleClickDeleteAllHistory}>전체 삭제</Button>
      </SearchInputBox>
      <SearchInputList
        isAutoSave={isAutoSave}
        keywordHistory={keywordHistory}
        toggleAutoSave={toggleAutoSave}
        removeKeywordHistory={removeKeywordHistory}
      />
      <SearchInputBox>
        <Button onClick={toggleAutoSave}>자동저장 끄기</Button>
        <Button onClick={hideBody}>닫기</Button>
      </SearchInputBox>
    </Container>
  );
}
