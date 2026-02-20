import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './baseApiService';
import { Observable } from 'rxjs';
import { createSuspense, Suspense } from '../utils/suspense';
import { RocketListFilteredRequestDTO } from '@models/rocket/rocketList';
import { Rocket } from '@models/rocket/rocket';
import { PaginatedResponse } from '../utils/paginated';

@Injectable({ providedIn: 'root' })
export class RocketsApiService {
  private _api = inject(BaseApiService);

  public getRockets(payload: RocketListFilteredRequestDTO): Observable<PaginatedResponse<Rocket>> {
    const payloadRequest = {
      query: {
        upcoming: false,
      },
      options: {
        page: payload.pageIndex,
        limit: payload.pageSize,
        sort: {
          date_utc: 'desc',
        },
      },
    };

    return this._api.post<PaginatedResponse<Rocket>>(`rockets/query`, payloadRequest);
  }

  public getPostRockets(payload: RocketListFilteredRequestDTO): Observable<Rocket[]> {
    const payloadRequest = {
      page: payload.pageIndex,
      limit: payload.pageSize,
    };

    return this._api.get<Rocket[]>('rockets', { params: payloadRequest });
  }

  public getRocketById(id: string): Observable<Suspense<Rocket>> {
    return createSuspense(this._api.get<Rocket>(`rockets/${id}`));
  }
}
