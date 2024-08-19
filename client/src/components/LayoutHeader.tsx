import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { CiHome } from 'react-icons/ci';
import { LiaAngleLeftSolid } from "react-icons/lia";

import BackSpace from './ui/BackSpace';

import { PageConfig } from '../types';

const Container = styled.header`
  grid-area: header;
  display: flex;
  flex-basis: 40px;
  justify-content: space-between;
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
      white-space: nowrap;
    }
  }
`;

const HomeWrapper = styled.div`
  display: flex;
`

// 빈칸 채우기용
const Blank = styled.div`
  flex-basis: 40px;
`

export default function LayoutHeader({ page }: {page: PageConfig}) {
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
      {page.homeButton ? (
          <Link to="/">
            <HomeWrapper>
              <CiHome size="24"/>
            </HomeWrapper>
          </Link>
        ) : (
          <Blank/>
        )
      }
    </Container>
  );
}
