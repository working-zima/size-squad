export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNUP_COMPLETE: '/signup/complete',
  PRODUCT_LIST: '/mysize',
  PRODUCT_NEW: '/mysize/new',
  PRODUCT_EDIT_PATTERN: '/mysize/:id/edit',
  MYPAGE: '/mypage',
  MYPAGE_PATTERN: '/mypage/:id',
  MYPAGE_EDIT_PATTERN: '/mypage/:id/edit',
  MYPAGE_INPUT_PATTERN: '/mypage/:id/edit/:path',
  SEARCH: '/search',

  productEdit: (id: string) => `/mysize/${id}/edit`,
  mypage: (id: string | undefined) => `/mypage/${id}`,
  mypageEdit: (id: string) => `/mypage/${id}/edit`,
  mypageEditInput: (id: string, path: string) => `/mypage/${id}/edit/${path}`,
};
