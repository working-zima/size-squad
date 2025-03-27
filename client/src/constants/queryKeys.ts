export const queryKeys = {
  userProducts: (params: {
    keyword?: string;
    categoryId?: string;
    subCategoryId?: string;
    sortCode?: string;
    per?: number;
    userId?: string;
  }) => ["userProducts", params],
};
