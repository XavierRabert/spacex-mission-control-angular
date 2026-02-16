import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './baseApiService.service';
import { Observable } from 'rxjs';
import { createSuspense, Suspense, SuspenseSignal } from '../utils/suspense';

const FEATURE_PATH = 'launches';
@Injectable({ providedIn: 'root' })
export class LaunchesApiService {
  private _api = inject(BaseApiService);

  public getPastLaunches(): SuspenseSignal<any[]> {
    return createSuspense(this._api.get<any[]>(`${FEATURE_PATH}/past`));
  }

  public getUpcomingLaunches(): Observable<any[]> {
    return this._api.get<any[]>(`${FEATURE_PATH}/upcoming`);
  }

  public getLaunchById(id: string): Observable<any> {
    return this._api.get<any>(`${FEATURE_PATH}/${id}`);
  }
}
