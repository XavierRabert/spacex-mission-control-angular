import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseApiService } from './baseApiService';
import { createSuspense, Suspense } from '../utils/suspense';
import { PaginatedResponse } from '../utils/paginated';
import { LaunchesListFilteredRequestDTO } from '@models/launches/launchesList';
import { Launchpad } from '@models/launches/launchpad';
import { Launch } from '@models/launches/launch';
import { Ll2Launch, Ll2ListResponse, mapLl2Launch } from './launch-library.models';

const SPACE_X_FILTER = 'lsp__name';
@Injectable({ providedIn: 'root' })
export class LaunchesApiService {
  private _api = inject(BaseApiService);

  public getPastLaunches(payload: LaunchesListFilteredRequestDTO): Observable<PaginatedResponse<Launch>> {
    const limit = payload.pageSize;
    const offset = (payload.pageIndex - 1) * limit;
    const params = new HttpParams()
      .set(SPACE_X_FILTER, 'SpaceX')
      .set('limit', limit)
      .set('offset', offset)
      .set('ordering', '-net')
      .set('mode', 'normal');

    return this._api.get<Ll2ListResponse<Ll2Launch>>('launches/previous/', params).pipe(
      map((response) => ({
        docs: response.results.map((launch) => mapLl2Launch(launch, false)),
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

  public getLatestLaunch(): Observable<Suspense<Launch>> {
    const params = new HttpParams()
      .set(SPACE_X_FILTER, 'SpaceX')
      .set('limit', 1)
      .set('ordering', '-net')
      .set('mode', 'normal');
    return createSuspense(
      this._api.get<Ll2ListResponse<Ll2Launch>>('launches/previous/', params).pipe(
        map((response) => {
          if (!response.results.length) throw new Error('No previous SpaceX launches were found.');
          return mapLl2Launch(response.results[0], false);
        }),
      ),
    );
  }

  public getNextLaunch(): Observable<Suspense<Launch>> {
    const params = new HttpParams()
      .set(SPACE_X_FILTER, 'SpaceX')
      .set('limit', 1)
      .set('ordering', 'net')
      .set('hide_recent_previous', 'true')
      .set('mode', 'normal');
    return createSuspense(
      this._api.get<Ll2ListResponse<Ll2Launch>>('launches/upcoming/', params).pipe(
        map((response) => {
          if (!response.results.length) throw new Error('No upcoming SpaceX launches were found.');
          return mapLl2Launch(response.results[0], true);
        }),
      ),
    );
  }

  public getLaunchById(id: string): Observable<Suspense<Launch>> {
    return createSuspense(
      this._api.get<Ll2Launch>(`launches/${id}/`).pipe(map((launch) => mapLl2Launch(launch, false))),
    );
  }

  public getLaunchpadById(id: string) {
    return this._api.get<Launchpad>(`pads/${id}/`).pipe(
      map((pad: any) => ({
        id: String(pad.id),
        name: pad.name,
        full_name: pad.name,
        locality: pad.location?.name || '',
        region: pad.location?.name || '',
        latitude: pad.latitude || 0,
        longitude: pad.longitude || 0,
        timezone: pad.location?.timezone_name || '',
        status: pad.active ? 'active' : 'inactive',
        images: { large: pad.image?.image_url ? [pad.image.image_url] : [] },
        launch_attempts: pad.total_launch_count || 0,
        launch_successes: 0,
        rockets: [],
        launches: [],
        details: pad.description || '',
      } satisfies Launchpad)),
    );
  }
}
