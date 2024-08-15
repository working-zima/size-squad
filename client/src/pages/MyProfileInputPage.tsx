import { useParams } from "react-router-dom"

import styled from "styled-components"

import AccessDeniedPage from "./AccessDeniedPage";

import EditPassword from "../components/myProfile/EditPassword"

import useAccessToken from "../hooks/useAccessToken";

import EditGender from "../components/myProfile/EditGender";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.sizes.contentPadding};
`

export default function MyProfileInputPage() {
  const { accessToken } = useAccessToken();

  const params = useParams();
  const path = String(params.path);
  const userId = String(params.id);

  if (!accessToken) {
    return <AccessDeniedPage />;
  }

  if(path === 'password') {
    return (
      <Container>
        <EditPassword userId={userId}/>
      </Container>
    )
  }

  if(path === 'gender') {
    return (
      <Container>
        <EditGender userId={userId}/>
      </Container>
    )
  }
}
