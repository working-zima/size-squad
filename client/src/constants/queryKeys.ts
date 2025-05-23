import { UserProductQueryParams } from '../types';
import { DEFAULT_PER, QUERY_KEYS } from './constants';

export const queryKeys = {
  userProducts: (params: UserProductQueryParams) => {
    const defaultParams = {
      keyword: params.keyword ?? '',
      categoryId: params.categoryId ?? '',
      subCategoryId: params.subCategoryId ?? '',
      sortCode: params.sortCode ?? 'RECENT',
      per: params.per ?? DEFAULT_PER,
      userId: params.userId ?? '',
    };

    return [QUERY_KEYS.USER_PRODUCTS, defaultParams];
  },

  product: (productId: string) => [QUERY_KEYS.PRODUCT, productId],
};
