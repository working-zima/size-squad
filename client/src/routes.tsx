import Layout from './components/Layout';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MySizeListPage from './pages/MySizeListPage';
import MySizeNewPage from './components/mySize/MySizeNewPage';
import MySizeEditPage from './pages/MySizeEditPage';
import NetworkErrorPage from './pages/NetworkErrorPage';
import MyPage from './pages/MyPage';

const routes = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/mysize', element: <MySizeListPage /> },
      { path: '/mysize/new', element: <MySizeNewPage /> },
      { path: '/mysize/:id/edit', element: <MySizeEditPage /> },
      { path: '/error/network', element: <NetworkErrorPage />},
      { path: '/mypage', element: <MyPage />},
    ],
  },
];

export default routes;
