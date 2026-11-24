import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseApiService } from './baseApiService';
import { createSuspense, Suspense } from '../utils/suspense';
import { RocketListFilteredRequestDTO } from '@models/rocket/rocketList';
import { Rocket } from '@models/rocket/rocket';
import { PaginatedResponse } from '../utils/paginated';
import { Ll2LauncherConfiguration, Ll2ListResponse, mapLl2Rocket } from './launch-library.models';

@Injectable({ providedIn: 'root' })
export class RocketsApiService {
  private _api = inject(BaseApiService);

  public getRockets(payload: RocketListFilteredRequestDTO): Observable<PaginatedResponse<Rocket>> {
    const limit = payload.pageSize;
    const offset = (payload.pageIndex - 1) * limit;
    const params = new HttpParams()
      .set('manufacturer__name', 'SpaceX')
      .set('limit', limit)
      .set('offset', offset)
      .set('ordering', '-total_launch_count')
      .set('mode', 'normal');

    return this._api.get<Ll2ListResponse<Ll2LauncherConfiguration>>('launcher_configurations/', params).pipe(
      map((response) => ({
        docs: response.results.map(mapLl2Rocket),
        totalDocs: response.count,
        limit,
        totalPages: Math.ceil(response.count / limit),
        page: payload.pageIndex,
        pagingCounter: offset + 1,
        hasPrevPage: offset > 0,
        hasNextPage: !!response.next,
        prevPage: offset > 0 ? payload.pageIndex - 1 : null,
        nextPage: response.next ? payload.pageIndex + 1 : null,
      })),
    );
  }

  public getRocketById(id: string): Observable<Suspense<Rocket>> {
    return createSuspense(
      this._api.get<Ll2LauncherConfiguration>(`launcher_configurations/${id}/`).pipe(map(mapLl2Rocket)),
    );
  }
}
