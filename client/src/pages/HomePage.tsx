import useAccessToken from "../hooks/useAccessToken";

export default function HomePage() {
  const { accessToken } = useAccessToken();

  return (
    <>
      <p>Hello World</p>
    </>
  );
}
