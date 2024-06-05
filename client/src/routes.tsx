import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import MySizeListPage from './pages/MySizeListPage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/mysize', element: <MySizeListPage /> },
    ],
  },
];

export default routes;
