import { Injectable, signal } from '@angular/core';
import { PaginationItem, PaginationResponse } from '../models/types';
import { Subject } from 'rxjs';
import { PaginationKeys } from '@models/pagination';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _paginators = new Map<PaginationKeys, PaginationItem>();

  private _updates = new Subject<PaginationKeys>();
  public updates$ = this._updates.asObservable();

  public getPaginationConfig(key: PaginationKeys) {
    return this._getOrCreatePagination(key);
  }

  public setPageLimit(key: PaginationKeys, limit: number) {
    const pagination = this._getOrCreatePagination(key);
    pagination.pagination.update((config) => ({ ...config, limit }));
    this._updates.next(key);
  }

  public setPageNum(key: PaginationKeys, page: number) {
    const pagination = this._getOrCreatePagination(key);
    pagination?.pagination.update((config) => ({ ...config, page }));
    this._updates.next(key);
  }

  public setResponse(key: PaginationKeys, response: PaginationResponse) {
    const pagination = this._getOrCreatePagination(key);
    pagination.response.update(() => response);
  }

  private _getOrCreatePagination(key: PaginationKeys) {
    if (!this._paginators.has(key)) {
      this._paginators.set(key, {
        pagination: signal({
          page: 1,
          limit: 10,
        }),
        response: signal({
          totalCount: 0,
          totalPages: 0,
        }),
      });
    }

    return this._paginators.get(key)!;
  }
}
