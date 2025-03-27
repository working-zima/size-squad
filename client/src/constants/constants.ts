import { ApiState, PageConfig, SortOption } from "../types";

export const DEFAULT_PER = 8;

export const FETCH_STATE: Record<string, ApiState> = {
  LOADING: "loading",
  FETCHED: "fetched",
  ERROR: "error",
  IDLE: "idle",
};

export const PAGES: Record<string, PageConfig> = {
  "/": {
    PAGETITLE: "Size Squad",
    LEFTBUTTON: "",
    RIGHTBUTTON: "search",
    FOOTER: true,
    SWITCHER: true,
    SHOWMENU: true,
  },
  "/mysize": {
    PAGETITLE: "Size Squad",
    LEFTBUTTON: "",
    RIGHTBUTTON: "search",
    FOOTER: false,
    SWITCHER: true,
    SHOWMENU: true,
  },
  "/login": {
    PAGETITLE: "로그인",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "",
    FOOTER: false,
    SWITCHER: false,
    SHOWMENU: false,
  },
  "/signup": {
    PAGETITLE: "회원가입",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "",
    FOOTER: false,
    SWITCHER: false,
    SHOWMENU: false,
  },
  "/mysize/:id/edit": {
    PAGETITLE: "사이즈 정보 변경",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "home",
    FOOTER: false,
    SWITCHER: false,
    SHOWMENU: false,
  },
  "/mysize/new": {
    PAGETITLE: "사이즈 등록",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "",
    FOOTER: false,
    SWITCHER: false,
    SHOWMENU: false,
  },
  "/mypage/:id": {
    PAGETITLE: "내 페이지",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "home",
    FOOTER: false,
    SWITCHER: true,
    SHOWMENU: false,
  },
  "/mypage/:id/edit": {
    PAGETITLE: "회원 정보 변경",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "home",
    FOOTER: false,
    SWITCHER: false,
    SHOWMENU: false,
  },
  "/mypage/:id/edit/:editField": {
    PAGETITLE: "특정 회원 정보 변경",
    LEFTBUTTON: "backspace",
    RIGHTBUTTON: "",
    FOOTER: false,
    SWITCHER: false,
    SHOWMENU: false,
  },
  "/search": {
    PAGETITLE: "",
    LEFTBUTTON: "",
    RIGHTBUTTON: "",
    FOOTER: false,
    SWITCHER: true,
    SHOWMENU: true,
  },
};

export const SORT_OPTIONS: Record<string, SortOption> = {
  RECENT: {
    _id: "1",
    name: "등록순 (최신 순)",
    sort: { createdAt: -1 },
    urlParam: "RECENT",
  },
  OLDEST: {
    _id: "2",
    name: "등록순 (오래된 순)",
    sort: { createdAt: 1 },
    urlParam: "OLDEST",
  },
  NAME_ASC: {
    _id: "3",
    name: "제품명 순 (ㄱ-ㅎ)",
    sort: { name: 1 },
    urlParam: "NAME_ASC",
  },
  NAME_DESC: {
    _id: "4",
    name: "제품명 순 (ㅎ-ㄱ)",
    sort: { name: -1 },
    urlParam: "NAME_DESC",
  },
  BRAND_ASC: {
    _id: "5",
    name: "브랜드명 순 (ㄱ-ㅎ)",
    sort: { brand: 1 },
    urlParam: "BRAND_ASC",
  },
  BRAND_DESC: {
    _id: "6",
    name: "브랜드명 순 (ㅎ-ㄱ)",
    sort: { brand: -1 },
    urlParam: "BRAND_DESC",
  },
};

export const DEFAULT_PRODUCT_FILTER = {
  categoryId: "",
  subCategoryId: "",
  sortCode: "RECENT",
  per: DEFAULT_PER,
};
