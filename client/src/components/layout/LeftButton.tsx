import styled from "styled-components"
import { LiaAngleLeftSolid } from "react-icons/lia"

import BackSpace from "../ui/BackSpace"

import { PageConfig } from "../../types"

const Blank = styled.div`
  flex-basis: 40px;
`

const HomeWrapper = styled.div`
  display: flex;
  width: 40px;
`

export default function LeftButton({ page }: { page: PageConfig }) {

  if (page.LEFTBUTTON === 'backspace') {
    return (
      <HomeWrapper>
        <BackSpace>
          <LiaAngleLeftSolid size="24" />
        </BackSpace>
      </HomeWrapper>
    )
  }

  return (
    <Blank />
  )
}
