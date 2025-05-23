import { RiHome5Line, RiSearchLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import usePortal from '../../hooks/usePortal';
import { PageConfig } from '../../types';
import SearchInput from '../searchInput/SearchInput';
import Button from '../ui/Button';

const HomeWrapper = styled.div`
  display: flex;
  width: 40px;
`;

const Blank = styled.div`
  flex-basis: 40px;
`;

const SearchTrigger = () => {
  const {
    opened: headerOpened,
    openModal: openHeader,
    closeModal: hideHeader,
  } = usePortal();
  const {
    opened: bodyOpened,
    openModal: openBody,
    closeModal: hideBody,
  } = usePortal();

  const openBoth = () => {
    openHeader();
    openBody();
  };

  return (
    <>
      <HomeWrapper>
        <Button onClick={openBoth}>
          <RiSearchLine size="24" />
        </Button>
      </HomeWrapper>
      <SearchInput
        headerOpened={headerOpened}
        bodyOpened={bodyOpened}
        hideHeader={hideHeader}
        hideBody={hideBody}
        isInitialOpen={true}
      />
    </>
  );
};

export default function RightButton({ page }: { page: PageConfig }) {
  if (page.RIGHTBUTTON === 'home') {
    return (
      <Link to="/">
        <HomeWrapper>
          <RiHome5Line size="24" />
        </HomeWrapper>
      </Link>
    );
  }

  if (page.RIGHTBUTTON === 'search') {
    return <SearchTrigger />;
  }

  return <Blank />;
}
