import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import MySizePage from './pages/MySizePage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/mysize', element: <MySizePage /> },
    ],
  },
];

export default routes;
