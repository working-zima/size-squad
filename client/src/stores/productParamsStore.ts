import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductParamsState = {
  keyword?: string;
  categoryId?: string;
  subCategoryId?: string;
  sortCode?: string;
  per?: number;
  userId?: string;
};

type ProductParamsActions = {
  actions: {
    setParams: (params: Partial<ProductParamsState>) => void;
    resetParams: () => void;
  };
};

type ProductParamsStore = ProductParamsState & ProductParamsActions;

export const productParamsStore = create(
  persist<ProductParamsStore>(
    (set) => ({
      keyword: "",
      categoryId: undefined,
      subCategoryId: undefined,
      sortCode: "RECENT",
      per: 20,
      userId: undefined,

      actions: {
        setParams: (params) =>
          set((state) => ({
            ...state,
            ...params,
          })),
        resetParams: () =>
          set((state) => ({
            ...state,
            keyword: "",
            categoryId: undefined,
            subCategoryId: undefined,
            sortCode: "RECENT",
            per: 20,
            userId: undefined,
          })),
      },
    }),
    {
      name: "product-params",
    }
  )
);
