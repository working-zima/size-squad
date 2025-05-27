import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { remove } from '../utils';
import { uniqueArray } from '../utils/uniqueArray';

type SearchStoreProps = {
  keywordHistory: string[];
  isAutoSave: boolean;
  addKeyword: (value: string) => void;
  removeKeyword: (index: number) => void;
  clearHistory: () => void;
  toggleAutoSave: () => void;
};

export const SearchStore = create<SearchStoreProps>()(
  persist(
    (set, get) => ({
      keywordHistory: [],
      isAutoSave: true,
      /**
       * 히스토리 추가
       * @param keyword
       */
      addKeyword: (keyword) => {
        if (!get().isAutoSave) return;
        const updated = uniqueArray([keyword, ...get().keywordHistory]).slice(
          0,
          10,
        );
        set({ keywordHistory: updated });
      },
      /**
       * 히스토리에서 특정 항목을 제거
       * @param index
       */
      removeKeyword: (index) => {
        const updated = remove(get().keywordHistory, index);
        set({ keywordHistory: updated });
      },
      /**
       * 히스토리 전체 삭제
       */
      clearHistory: () => set({ keywordHistory: [] }),
      /**
       * isAutoSave 상태 업데이트 및 로컬 스토리지에 저장
       * @param state
       */
      toggleAutoSave: () => set((state) => ({ isAutoSave: !state.isAutoSave })),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        keywordHistory: state.keywordHistory,
        isAutoSave: state.isAutoSave,
      }),
    },
  ),
);
