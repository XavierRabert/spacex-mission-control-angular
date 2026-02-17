import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './baseApiService';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RocketsApiService {
  private _api = inject(BaseApiService);

  public getRockets(): Observable<any[]> {
    return this._api.get<any[]>('rockets');
  }

  public getRocketById(id: string): Observable<any> {
    return this._api.get<any>(`rockets/${id}`);
  }
}
