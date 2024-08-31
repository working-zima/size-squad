import { useMatch } from 'react-router-dom';

import styled from 'styled-components';

import { PageConfig } from '../../types';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

type ContainerProps = {
  isHeaderless: boolean;
}

const Container = styled.header<ContainerProps>`
  grid-area: header;
  display: flex;
  flex-basis: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.isHeaderless
    ? 'white'
    : props.theme.colors.backgroundColor
  };

  h1 {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0px, 0px, 0px, 0px);
  }

  h2 {
  font-size: 2.5rem;

    p {
      color: black;
      user-select: none;
      white-space: nowrap;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 768px;
  padding: 0 1rem;
`;

export default function LayoutHeader({
  page
}: { page: PageConfig }) {
  const isSignupCompletePage = useMatch('/signup/complete');

  return (
    <Container isHeaderless={!!isSignupCompletePage}>
      <h1>사이즈 스쿼드</h1>
      <ContentWrapper>
        <LeftButton page={page} />
        <h2>
          <p>
            {page.PAGETITLE}
          </p>
        </h2>
        <RightButton page={page} />
      </ContentWrapper>
    </Container>
  );
}
