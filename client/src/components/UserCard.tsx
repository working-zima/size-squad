import { Link } from "react-router-dom";

import styled from "styled-components";

import { User } from "../types";

import { GENDER_MESSAGES } from "../constants";

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.dividerColor};
  align-items: center;
  height: 130px;
`;

const Name = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  color: ${props => props.theme.colors.primaryBlack};

  h3 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    color: ${props => props.theme.colors.primaryBlack};
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.secondaryTextColor};
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primaryBlack};
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
`;

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  console.log(!!user.description)
  return (
    <Container>
      <Name>
        <Link to={`/mypage/${user?._id}`}>
          <h3>{user.name}</h3>
        </Link>
      </Name>
      <Info>
        <InfoText>
          {GENDER_MESSAGES[user.gender.name]} {user.height} cm / {user.weight} kg
        </InfoText>
        <div>
          {user.description
            ? <Description>{user.description}</Description>
            : <div>조금 과묵한 타입</div>
          }
        </div>
      </Info>
    </Container>
  );
}
