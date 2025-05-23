import styled from 'styled-components';

import LineClampedText from '../ui/LineClamp';

const Container = styled.div`
  font-weight: 500;
  user-select: none;
`;

export default function DescriptionRow({
  description,
}: {
  description: string;
}) {
  return (
    <Container>
      <LineClampedText text={[description]} lines={1} hasButton={true} />
    </Container>
  );
}
