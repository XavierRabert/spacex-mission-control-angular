import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './baseApiService';
import { Observable } from 'rxjs';
import { createSuspense, Suspense } from '../utils/suspense';
import { Rocket } from '@models/rocket/rocket';

@Injectable({ providedIn: 'root' })
export class RocketsApiService {
  private _api = inject(BaseApiService);

  public getRockets(): Observable<Suspense<Rocket[]>> {
    return createSuspense(this._api.get<Rocket[]>('rockets'));
  }

  public getRocketById(id: string): Observable<Suspense<Rocket>> {
    return createSuspense(this._api.get<Rocket>(`rockets/${id}`));
  }
}
