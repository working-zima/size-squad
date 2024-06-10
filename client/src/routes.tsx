import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import MySizeEditPage from './pages/MySizeEditPage';
import MySizeListPage from './pages/MySizeListPage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/mysize', element: <MySizeListPage /> },
      { path: '/mysize/:id/edit', element: <MySizeEditPage /> },
    ],
  },
];

export default routes;
