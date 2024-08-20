import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  position: relative;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  font-size: 1.6rem;
  border-bottom: 1px solid ${props => props.theme.colors.dividerColor};

  strong {
    color: ${props => props.theme.colors.secondaryTextColor};
  }

  span {
    font-size: 1.5rem;
  }
`

const Arrow = styled.div`
  position: absolute;
  right: 10px;
  bottom: 31px;
  border: 0;
  background-color: transparent;
  width: 5px;
  height: 5px;
  padding: 0;
  cursor: pointer;

  /* 옆 화살표 */
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-width: 1.2px;
    border-style: solid;
    border-color: transparent #333 #333 transparent;
    transform: rotate(315deg);
    vertical-align: middle;
  }
`;

type MyProfileCardProps = {
  label: string;
  value: string | undefined;
  path: string;
  isEditable: boolean;
}

type ProfileWrapperProps = {
  isEditable: boolean;
}

const ProfileWrapper = styled.div<ProfileWrapperProps>`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.isEditable ? '0 30px 0 0' : '0'};
`

const EditLink = styled.div`
  a {
    inset: 0px; // 부모 요소의 각 경계에서 0px 떨어진 곳에 위치하게 되어 전체 영역을 덮음
    position: absolute;
    background: none;
  }

  span {
    visibility: hidden;
  }
`

export default function MyProfileCard({
  label,
  value,
  path,
  isEditable
}: MyProfileCardProps) {
  return (
    <Container>
      <ProfileWrapper isEditable={isEditable}>
        <strong>{label}</strong>
        <span>{value}</span>
      </ProfileWrapper>
      {isEditable && (
        <>
          <EditLink>
            <Link to={path}>
              <span>Edit</span>
            </Link>
          </EditLink>
          <Arrow />
        </>
      )}
    </Container>
  )
};
