import styled from "styled-components";
import { User } from "../types"
import { USERFIELDS } from "../constants";

const Container = styled.div`
  padding: 1.2rem 0.2rem;
  font-size: 1.4rem;
  line-height: 1.67;
  border-bottom: 1px solid ${props => props.theme.colors.dividerColor};
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  height: 40px;
  margin-bottom: 1.6rem;
  background-color: ${props => props.theme.colors.backgroundColor};

  overflow: auto;
  white-space: nowrap;
  scrollbar-width: none; // 파이어폭스
  -ms-overflow-style: none; // 인터넷 익스플로러
  &::-webkit-scrollbar {
    display: none; // 크롬, 사파리, 오페라, 엣지
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  align-items: center;
  color: ${props => props.theme.colors.secondaryTextColor};

  p {
    font-weight: bold;
    font-size: 1.4rem;
    margin-left: 0.5rem;
    color: ${props => props.theme.colors.primaryBlack};
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primaryBlack};
  height: 100%;
  white-space: pre-line;

  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

type UserCardProps = {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Container>
      <UserRow>
        <UserInfo>{USERFIELDS['name']}:  <p>{user.name}</p></UserInfo>
        <UserInfo>{USERFIELDS['gender']}: <p>{user.gender.name}</p></UserInfo>
        <UserInfo>
          {USERFIELDS['physical']}: <p>{user.height} cm / {user.weight} kg</p>
        </UserInfo>
      </UserRow>
      <Description>{user.description}</Description>
    </Container>
  )
}
