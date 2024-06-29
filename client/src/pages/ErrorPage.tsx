import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(`ErrorPage: `, error)

  return (
    <div>
      <h3>Something went wrong!</h3>
      <p>{error.message}</p>  {/* 에러 메시지를 표시합니다. */}
    </div>

  )
}
