import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_PER } from '../constants/constants';

type ProductParamsState = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
  userId?: string;
};

type ProductParamsStore = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
  userId?: string;
  setParams: (params: Partial<ProductParamsState>) => void;
  resetParams: () => void;
};

/**
 * 상품 목록 조회 시 사용하는 쿼리 파라미터 상태를 관리하는 zustand store
 *
 * - keyword: 검색 키워드
 * - categoryId: 선택된 카테고리 ID
 * - subCategoryId: 선택된 서브 카테고리 ID
 * - sortCode: 정렬 방식 (예: 'RECENT', 'OLDEST')
 * - per: 페이지당 아이템 수
 * - userId: 사용자 ID (필터링 용도)
 *
 * zustand의 persist 미들웨어를 통해 localStorage에 상태를 저장하며,
 * 다음 방문 시에도 동일한 파라미터 상태를 유지할 수 있습니다.
 */
export const ProductParamsStore = create<ProductParamsStore>()(
  persist(
    (set) => ({
      keyword: '',
      categoryId: '',
      subCategoryId: '',
      sortCode: 'RECENT',
      per: DEFAULT_PER,
      userId: '',

      setParams: (params) =>
        set((state) => ({
          ...state,
          ...params,
        })),

      resetParams: () =>
        set((state) => ({
          ...state,
          keyword: '',
          categoryId: '',
          subCategoryId: '',
          sortCode: 'RECENT',
          per: DEFAULT_PER,
          userId: '',
        })),
    }),
    {
      name: 'product-params',
      partialize: (state) => ({
        keyword: state.keyword,
        categoryId: state.categoryId,
        subCategoryId: state.subCategoryId,
        sortCode: state.sortCode,
        per: state.per,
        userId: state.userId,
      }),
    },
  ),
);
