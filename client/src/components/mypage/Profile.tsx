import styled from "styled-components";

import UserRow from "./UserRow";
import DescriptionRow from "./DescriptionRow";
import ButtonsRow from "./ButtonsRow";

import { User } from "../../types";

const Container = styled.section`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  font-size: 1.3rem;
  line-height: ${(props) => props.theme.sizes.lineHeight};
  padding: ${(props) => props.theme.sizes.contentPadding};
  padding-bottom: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.dividerColor};
  background-color: ${(props) => props.theme.colors.primaryWhite};
  z-index: 1001;
`;

type ProfileProps = {
  user: User;
  isOwner: boolean;
  handleClickLogout: () => void;
};

export default function Profile({
  user,
  isOwner,
  handleClickLogout,
}: ProfileProps) {
  return (
    <Container>
      <UserRow user={user} />
      <DescriptionRow description={user.description} />
      <ButtonsRow
        isOwner={isOwner}
        userId={user._id}
        handleClickLogout={handleClickLogout}
      />
    </Container>
  );
}
