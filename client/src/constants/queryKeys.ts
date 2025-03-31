import { DEFAULT_PER } from "./constants";

export const queryKeys = {
  userProducts: (params: {
    keyword?: string;
    categoryId?: string;
    subCategoryId?: string;
    sortCode?: string;
    per?: number;
    userId?: string;
  }) => {
    const defaultParams = {
      keyword: params.keyword ?? "",
      categoryId: params.categoryId ?? "",
      subCategoryId: params.subCategoryId ?? "",
      sortCode: params.sortCode ?? "RECENT",
      per: params.per ?? DEFAULT_PER,
      userId: params.userId ?? "",
    };

    return ["userProducts", JSON.stringify(defaultParams)];
  },
};
