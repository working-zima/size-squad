import { Link } from "react-router-dom";
import styled from "styled-components";
import { User } from "../types";
import { GENDER_MESSAGES } from "../constants";

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerColor};
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  height: 130px;
`;

const UserColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.8rem;
  border-right: 1px solid black;
`;

const UserInfo = styled.div`
  display: flex;
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

const InfoText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.secondaryTextColor};
`;

const DescriptionColumn = styled.div`
    flex: 3;
`

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
      <UserColumn>
        <UserInfo>
          <Link to={`/mypage/${user?._id}`}>
            <h3>{user.name}</h3>
          </Link>
        </UserInfo>
        <InfoText>{GENDER_MESSAGES[user.gender.name]}</InfoText>
        <InfoText>{user.height} cm / {user.weight} kg</InfoText>
      </UserColumn>
      <DescriptionColumn>
        {user.description
          ? <Description>{user.description}</Description>
          : <div>조금 과묵한 타입</div>
        }
      </DescriptionColumn>
    </Container>
  );
}
