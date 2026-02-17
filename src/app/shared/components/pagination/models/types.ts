import { signal } from '@angular/core';

export type PaginationConfig = {
  page: number;
  limit: number;
};

export type PaginationResponse = {
  totalCount: number;
  totalPages: number;
};

export type PaginationItem = {
  pagination: ReturnType<typeof signal<PaginationConfig>>;
  response: ReturnType<typeof signal<PaginationResponse>>;
};
