import { UserProductQueryParams } from "../types";
import { DEFAULT_PER } from "./constants";

export const queryKeys = {
  userProducts: (params: UserProductQueryParams) => {
    const defaultParams = {
      keyword: params.keyword ?? "",
      categoryId: params.categoryId ?? "",
      subCategoryId: params.subCategoryId ?? "",
      sortCode: params.sortCode ?? "RECENT",
      per: params.per ?? DEFAULT_PER,
      userId: params.userId ?? "",
    };

    return ["userProducts", defaultParams];
  },

  product: (productId: string) => ["product", productId],
};
