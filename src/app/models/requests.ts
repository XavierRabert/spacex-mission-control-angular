export type PaginatedRequestDTO<T = unknown> = {
  filter?: T;
  pageIndex: number;
  pageSize: number;
};
