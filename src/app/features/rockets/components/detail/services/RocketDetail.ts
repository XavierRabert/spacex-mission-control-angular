import { Injectable, inject, signal } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { RocketsApiService } from 'src/app/core/api/rocketsApiService';
import { getSuspensifyInitialValues } from 'src/app/core/utils/suspense';

@Injectable({ providedIn: 'root' })
export class RocketDetailService {
  private _rocketsService = inject(RocketsApiService);

  private _rocketId = signal<string | null>(null);
  public rocketId = this._rocketId.asReadonly();

  public rocket = derivedAsync(
    () => {
      if (!this._rocketId()) return;
      return this._rocketsService.getRocketById(this._rocketId()!);
    },
    {
      initialValue: getSuspensifyInitialValues(undefined),
    },
  );

  public setRocketId(id: string) {
    this._rocketId.set(id);
  }
}
