import styled from "styled-components";

import { User } from "../../types";

import { GENDER_MESSAGES } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  margin-bottom: 4px;

  div {
    font-size: 1.4rem;
  }

  span {
    padding: 4px 0;
    font-weight: 400;
    color: ${props => props.theme.colors.unSelectedText};
  }
`

export default function UserRow({ user }: { user: User }) {
  return (
    <Container>
      <div>{user?.name}</div>
      <span>
        {user?.height}cm / {user.weight}kg · {GENDER_MESSAGES[user.gender?.name]}
      </span>
    </Container>
  )
}
