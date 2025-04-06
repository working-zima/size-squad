import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_PER } from "../constants/constants";

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

export const ProductParamsStore = create(
  persist<ProductParamsStore>(
    (set) => ({
      keyword: "",
      categoryId: "",
      subCategoryId: "",
      sortCode: "RECENT",
      per: DEFAULT_PER,
      userId: "",

      setParams: (params) =>
        set((state) => ({
          ...state,
          ...params,
        })),

      resetParams: () =>
        set((state) => ({
          ...state,
          keyword: "",
          categoryId: "",
          subCategoryId: "",
          sortCode: "RECENT",
          per: DEFAULT_PER,
          userId: "",
        })),
    }),
    {
      name: "product-params",
    }
  )
);
