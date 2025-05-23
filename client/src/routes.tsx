import Layout from './components/layout/Layout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import MyProfileEditPage from './pages/MyProfileEditPage';
import MyProfileInputPage from './pages/MyProfileInputPage';
import MySizeEditPage from './pages/MySizeEditPage';
import MySizeListPage from './pages/MySizeListPage';
import MySizeNewPage from './pages/MySizeNewPage';
import SearchResultPage from './pages/SearchResultPage';
import SignupCompletePage from './pages/SignupCompletePage';
import SignupPage from './pages/SignupPage';

const routes = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/signup/complete', element: <SignupCompletePage /> },
      { path: '/mysize', element: <MySizeListPage /> },
      { path: '/mysize/new', element: <MySizeNewPage /> },
      { path: '/mysize/:id/edit', element: <MySizeEditPage /> },
      { path: '/mypage/:id', element: <MyPage /> },
      { path: '/mypage/:id/edit', element: <MyProfileEditPage /> },
      { path: '/mypage/:id/edit/:path', element: <MyProfileInputPage /> },
      { path: '/search', element: <SearchResultPage /> },
    ],
  },
];

export default routes;
