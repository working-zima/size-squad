import styled from 'styled-components';

interface ContainerProps {
  hasChildren: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  margin: 40px 0 28px;
  font-size: 14px;
  width: 100%;

  &::before {
    flex: 1;
    width: 100%;
    margin-right: ${({ hasChildren }) => (hasChildren ? '1.6rem' : '0')};
    border-top: 1px solid ${(props) => props.theme.colors.borderColor};
    content: '';
  }

  &::after {
    flex: 1;
    width: 100%;
    margin-left: ${({ hasChildren }) => (hasChildren ? '1.6rem' : '0')};
    border-top: 1px solid ${(props) => props.theme.colors.borderColor};
    content: '';
  }
`;

export default function Divider({ children }: { children?: React.ReactNode }) {
  return <Container hasChildren={!!children}>{children}</Container>;
}
