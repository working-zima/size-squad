import Layout from './components/Layout';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupCompletePage from './pages/SignupCompletePage';
import MySizeListPage from './pages/MySizeListPage';

import MySizeEditPage from './pages/MySizeEditPage';
import NetworkErrorPage from './pages/NetworkErrorPage';
import MyPage from './pages/MyPage';
import MySizeNewPage from './pages/MySizeNewPage';

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
      { path: '/error/network', element: <NetworkErrorPage />},
      { path: '/mypage', element: <MyPage />},
    ],
  },
];

export default routes;
