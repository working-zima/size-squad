import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../constants/constants';
import {
  PaginationResponse,
  ProductResponse,
  UserProductQueryParams,
} from '../types';

/**
 * "userProducts" 키를 가진 캐시에서 product._id 가 deletedId 에 해당하는 객체 찾기
 * @param queryClient
 * @param productId
 * @returns
 */
export const findProductFromUserProductsByProductId = (
  queryClient: QueryClient,
  productId: string,
) => {
  const queryCache = queryClient.getQueryCache();
  const userProductsQueryCache = queryCache.findAll({
    queryKey: [QUERY_KEYS.USER_PRODUCTS],
  });

  for (const { queryKey } of userProductsQueryCache) {
    const data = queryClient.getQueryData(queryKey) as
      | InfiniteData<PaginationResponse<ProductResponse>>
      | undefined;

    if (!data?.pages) continue;

    for (const page of data.pages) {
      const found = page.docs.find((product) => product._id === productId);
      if (found) return found;
    }
  }

  return undefined;
};

export type RelatedProductParams = {
  authorId: string;
  categoryId: string;
  subCategoryId: string;
};

/**
 * 삭제 대상과 관련 있는 필터(카테고리/서브카테고리/작성자 등)를 가진 쿼리만 추려내기
 * @param queryClient
 * @param product
 * @returns
 */
export const getRelatedUserProductQueryKeys = (
  queryClient: QueryClient,
  { authorId, categoryId, subCategoryId }: RelatedProductParams,
) => {
  const queryCache = queryClient.getQueryCache();
  const userProductsQueryCache = queryCache.findAll({
    queryKey: [QUERY_KEYS.USER_PRODUCTS],
  });

  const relatedQueryKeys = userProductsQueryCache
    .filter(({ queryKey }) => {
      const [, defaultParams] = queryKey as [string, UserProductQueryParams];

      const sameUser = defaultParams.userId === authorId;
      const sameCategory =
        defaultParams.categoryId === categoryId ||
        defaultParams.categoryId === '';
      const sameSubCategory =
        defaultParams.subCategoryId === subCategoryId ||
        defaultParams.subCategoryId === '';

      return sameUser && sameCategory && sameSubCategory;
    })
    .map((query) => query.queryKey);

  return relatedQueryKeys;
};
