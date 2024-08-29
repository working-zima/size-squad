import { Link } from "react-router-dom"

import styled from "styled-components"
import { CiHome } from "react-icons/ci"
import { CiSearch } from "react-icons/ci";

import { PageConfig } from "../../types"
import usePortal from "../../hooks/usePortal";
import Button from "../ui/Button";
import SearchInput from "../SearchInput";

const HomeWrapper = styled.div`
  display: flex;
`

const Blank = styled.div`
  flex-basis: 40px;
`

const SearchTrigger = ({ id }: { id: string; }) => {
  const {
    opened: headerOpened,
    openModal: openHeader,
    closeModal: closeHeader
  } = usePortal();
  const {
    opened: bodyOpened,
    openModal: openBody,
    closeModal: closeBody
  } = usePortal();

  const openBoth = () => {
    openHeader();
    openBody();
  };

  return (
    <>
      <HomeWrapper>
        <Button onClick={openBoth}>
          <CiSearch size="24" />
        </Button>
      </HomeWrapper>
      <SearchInput
        headerOpened={headerOpened}
        bodyOpened={bodyOpened}
        hideHeader={closeHeader}
        hideBody={closeBody}
        isInitialOpen={true}
      />
    </>
  )
}

export default function RightButton({ page }: { page: PageConfig }) {

  if (page.RIGHTBUTTON === 'home') {
    return (
      <Link to="/">
        <HomeWrapper>
          <CiHome size="24" />
        </HomeWrapper>
      </Link>
    )
  }

  if (page.RIGHTBUTTON === 'search') {
    return (
      <SearchTrigger id="1" />
    )
  }

  return (
    <Blank />
  )
}