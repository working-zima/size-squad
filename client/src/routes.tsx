import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import MySizeListPage from './pages/MySizeListPage';
import MySizeNewPage from './components/mySize/MySizeNewPage';
import MySizeEditPage from './pages/MySizeEditPage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/mysize', element: <MySizeListPage /> },
      { path: '/mysize/new', element: <MySizeNewPage /> },
      { path: '/mysize/:id/edit', element: <MySizeEditPage /> },
    ],
  },
];

export default routes;
