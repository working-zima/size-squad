import { Link, useLocation, useMatch } from 'react-router-dom';

import styled from 'styled-components';
import { LiaAngleLeftSolid } from "react-icons/lia";

import BackSpace from './ui/BackSpace';
import { TITLE } from '../constants';
import useUserStore from '../hooks/useUserStore';

const Container = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  flex-basis: 40px;
  align-items: center;
  padding: 0 1rem;
  background-color: ${(props) => props.theme.colors.dividerColor};

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
    }
  }
`;

const Blank = styled.div`
  flex-basis: 40px;
`

export default function LayoutHeader() {
  const location = useLocation();

  const [{ user }] = useUserStore();

  const defaultTitle = 'Size Squad';

  const isEditPage = useMatch('/mysize/:id/edit');
  const isMyPage = useMatch('/mypage');

  let pageTitle = TITLE[location.pathname] || defaultTitle;

  if (isEditPage) {
    pageTitle = TITLE['/mysize/:id/edit'];
  }
  if (isMyPage && user) {
    pageTitle = `${user.name}님의 페이지`;  // /mypage 경로에서 사용자 이름 사용
  }

  return (
    <Container>
      <h1>사이즈 스쿼드</h1>
      {pageTitle !==  'Size Squad' ? (
          <BackSpace>
            <LiaAngleLeftSolid size="24"/>
          </BackSpace>
        ) : (
          <Blank/>
        )
      }
      <h2>
        <p>
          {pageTitle}
        </p>
      </h2>
      <Blank/>
    </Container>
  );
}
