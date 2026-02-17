export type PaginatedRequestDTO<T> = {
  filter: T;
  pageIndex: number;
  pageSize: number;
};
