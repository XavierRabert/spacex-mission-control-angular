import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './baseApiService';
import { Observable } from 'rxjs';
import { createSuspense, Suspense } from '../utils/suspense';
import { PaginatedResponse } from '../utils/paginated';
import { Launch, LaunchesListFilteredRequestDTO } from '@models/launches/launchesList';

const FEATURE_PATH = 'launches';
@Injectable({ providedIn: 'root' })
export class LaunchesApiService {
  private _api = inject(BaseApiService);

  public getPastLaunches(
    payload: LaunchesListFilteredRequestDTO,
  ): Observable<PaginatedResponse<Launch>> {
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

    return this._api.post<PaginatedResponse<Launch>>(`launches/query`, payloadRequest);
  }

  public getLatestLaunch(): Observable<Suspense<any>> {
    return createSuspense(this._api.get<any>(`${FEATURE_PATH}/latest`));
  }

  public getNextLaunch(): Observable<Suspense<any>> {
    return createSuspense(this._api.get<any>(`${FEATURE_PATH}/next`));
  }

  public getLaunchById(id: string): Observable<Suspense<any>> {
    return createSuspense(this._api.get<any>(`${FEATURE_PATH}/${id}`));
  }

  public getLaunchpadById(id: string) {
    return this._api.get<any>(`launchpads/${id}`);
  }
}
