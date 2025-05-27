import Layout from './components/layout/Layout';
import { ROUTES } from './constants/pageRoutes';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import MyProfileEditPage from './pages/MyProfileEditPage';
import MyProfileInputPage from './pages/MyProfileInputPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductEditPage from './pages/ProductEditPage';
import ProductListPage from './pages/ProductListPage';
import SearchResultPage from './pages/SearchResultPage';
import SignupCompletePage from './pages/SignupCompletePage';
import SignupPage from './pages/SignupPage';

const routes = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: ROUTES.SIGNUP_COMPLETE, element: <SignupCompletePage /> },
      { path: ROUTES.PRODUCT_LIST, element: <ProductListPage /> },
      { path: ROUTES.PRODUCT_NEW, element: <ProductCreatePage /> },
      { path: ROUTES.PRODUCT_EDIT_PATTERN, element: <ProductEditPage /> },
      { path: ROUTES.MYPAGE_PATTERN, element: <MyPage /> },
      { path: ROUTES.MYPAGE_EDIT_PATTERN, element: <MyProfileEditPage /> },
      {
        path: ROUTES.MYPAGE_INPUT_PATTERN,
        element: <MyProfileInputPage />,
      },
      { path: ROUTES.SEARCH, element: <SearchResultPage /> },
    ],
  },
];

export default routes;
