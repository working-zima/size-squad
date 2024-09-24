import { useEffect } from "react";
import { useParams } from "react-router-dom"

import styled from "styled-components"

import AccessDeniedPage from "./AccessDeniedPage";

import EditPassword from "../components/myProfile/EditPassword"
import EditGender from "../components/myProfile/EditGender";
import EditHeight from "../components/myProfile/EditHeight";
import EditWeight from "../components/myProfile/EditWeight";
import EditDescription from "../components/myProfile/EditDescription";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import useSignupFormStore from "../hooks/useSignupFormStore";
import useAuthStore from "../hooks/useAuthStore";

import { accessTokenUtil } from "../auth/accessTokenUtil";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.sizes.contentPadding};
`

export default function MyProfileInputPage() {
  const [{ user, state }] = useAuthStore()
  const params = useParams()
  const path = String(params.path)
  const [, store] = useSignupFormStore()

  useEffect(() => {
    store.changeGender(user.gender)
    store.changeHeight(user.height)
    store.changeWeight(user.weight)
    store.changeDescription(user.description)
  }, [])

  if (state === 'loading') {
    return <LoadingSpinner />;
  }

  if (!accessTokenUtil.getAccessToken()) {
    return <AccessDeniedPage />
  }

  if (path === 'password') {
    return (
      <Container>
        <EditPassword />
      </Container>
    )
  }

  if (path === 'gender') {
    return (
      <Container>
        <EditGender />
      </Container>
    )
  }

  if (path === 'height') {
    return (
      <Container>
        <EditHeight />
      </Container>
    )
  }

  if (path === 'weight') {
    return (
      <Container>
        <EditWeight />
      </Container>
    )
  }

  if (path === 'description') {
    return (
      <Container>
        <EditDescription />
      </Container>
    )
  }
}
