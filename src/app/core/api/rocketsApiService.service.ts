import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './baseApiService.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RocketsService {
  private api = inject(BaseApiService);

  public getRockets(): Observable<any[]> {
    return this.api.get<any[]>('rockets');
  }

  public getRocketById(id: string): Observable<any> {
    return this.api.get<any>(`rockets/${id}`);
  }
}
