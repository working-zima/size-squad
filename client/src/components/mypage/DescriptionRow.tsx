import styled from "styled-components"

import LineClampedText from "../ui/LineClamp"

const Container = styled.div`
  font-weight: 500;
`

export default function DescriptionRow({
  description
}: { description: string }) {
  return (
    <Container>
      <LineClampedText
        text={[description
          ? description
          : '간단한 체형 정보를 적어보세요'
        ]}
        lines={1}
        hasButton={true}
      />
    </Container>
  )
}
