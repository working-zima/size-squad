import { useMemo } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PageList = styled.ul`
  position: relative;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const PageItem = styled.li<{ isCurrent: boolean }>`
  button {
    position: relative;
    display: block;
    width: 100%;
    outline: 0;
    border: 0;
    padding: 25px 10px 10px;
    background: none;
    color: ${props => props.theme.colors.secondaryTextColor};
    text-align: center;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 7px;
      height: 7px;
      border: 1px solid ${props => props.theme.colors.secondaryTextColor};
      border-radius: 50%;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${({ isCurrent, theme }) => (isCurrent ? theme.colors.secondaryTextColor : 'transparent')};
    }
  }

  button {
    font-weight: ${({ isCurrent }) => (isCurrent ? 700 : 400)};
  }
`;

const Pagination = ({
  totalPages,
  currentIndex,
  visibleCount,
  handleMove,
}: {
  totalPages: number;
  currentIndex: number;
  visibleCount?: number;
  handleMove: (index: number) => void;
}) => {
  const indexes = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i), [totalPages]
  );

  const viewCount = Math.min(visibleCount || totalPages, totalPages);
  const halfCount = Math.floor(viewCount / 2);
  const visibleMin = Math.min(
    Math.max(0, currentIndex - halfCount), totalPages - viewCount
  );

  const visiblePages = indexes.slice(visibleMin, visibleMin + viewCount);

  return (
    <Container>
      <PageList>
        {visiblePages.map((pageIndex) => (
          <PageItem
            key={pageIndex}
            isCurrent={currentIndex === pageIndex}
          >
            <button onClick={() => handleMove(pageIndex)} />
          </PageItem>
        ))}
      </PageList>
    </Container>
  );
};

export default Pagination;
