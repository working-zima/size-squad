import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GENDER } from '../constants/apiLocalizationMap';
import { User } from '../types';
import LineClampedText from './ui/LineClamp';

const Container = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.dividerColor};
  align-items: center;
  height: 130px;
  gap: 18px;
`;

const Name = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  color: ${(props) => props.theme.colors.primaryBlack};

  h3 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    color: ${(props) => props.theme.colors.primaryBlack};
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
  height: 100%;
`;

const InfoText = styled.p`
  margin: 12px 0;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Container>
      <Name>
        <Link to={`/mypage/${user?._id}`}>
          <h3>{user.name}</h3>
        </Link>
      </Name>
      <Info>
        <InfoText>
          {user.height ? `${user.height}cm` : ''}{' '}
          {user.weight ? `${user.weight}kg` : ''} {GENDER[user.gender.name]}
        </InfoText>
        <LineClampedText
          text={
            user.description
              ? [user.description]
              : [
                  '아직 자신의 핏 정보를 작성하지 않았지만, 곧 멋진 업데이트가 있을 거예요',
                ]
          }
          lines={3}
          hasButton={false}
        />
      </Info>
    </Container>
  );
}
