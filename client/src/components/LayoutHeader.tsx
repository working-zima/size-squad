import { useLocation, useMatch, useParams } from 'react-router-dom';

import styled from 'styled-components';
import { LiaAngleLeftSolid } from "react-icons/lia";

import BackSpace from './ui/BackSpace';
import { PAGES, USERFIELDS } from '../constants';

import useUserStore from '../hooks/useUserStore';

const Container = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  flex-basis: 40px;
  align-items: center;
  padding: 0 1rem;
  background-color: ${(props) => props.theme.colors.backgroundColor};

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
  const params = useParams();

  const path = String(params.path);

  const [{ user }] = useUserStore();

  const isEditSizePage = useMatch('/mysize/:id/edit');
  const isEditProfilePage = useMatch('/mypage/:id/edit');
  const isEditProfile = useMatch('/mypage/:id/edit/:editField')
  const isMyPage = useMatch('/mypage');

  const defaultPage = {
    pageTitle: '', homeButton: false, backSpace: false, showMenu: false
  }

  let page = PAGES[location.pathname] || defaultPage;

  if (isEditSizePage) page = PAGES['/mysize/:id/edit'];

  if (isEditProfilePage) page = PAGES['/mypage/:id/edit'];

  if (isMyPage && user) {
    page.pageTitle = `${user.name}님의 페이지`;
  }

  if (isEditProfile && user) {
    page = PAGES['/mypage/:id/edit/:editField'];
    page.pageTitle = `${USERFIELDS[path]} 변경`
  }

  return (
    <Container>
      <h1>사이즈 스쿼드</h1>
      {page.backSpace ? (
          <BackSpace>
            <LiaAngleLeftSolid size="24"/>
          </BackSpace>
        ) : (
          <Blank/>
        )
      }
      <h2>
        <p>
          {page.pageTitle}
        </p>
      </h2>
      <Blank/>
    </Container>
  );
}
