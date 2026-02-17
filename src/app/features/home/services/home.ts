import { Injectable, inject } from '@angular/core';
import { getSuspensifyInitialValues } from 'src/app/core/utils/suspense';
import { LaunchesApiService } from 'src/app/core/api/launchesApiService';
import { derivedAsync } from 'ngxtension/derived-async';
import { of } from 'rxjs';
import { RocketsApiService } from 'src/app/core/api/rocketsApiService';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private _launchesService = inject(LaunchesApiService);
  private _rocketsService = inject(RocketsApiService);

  public latestLaunch = derivedAsync(() => this._launchesService.getLatestLaunch(), {
    initialValue: getSuspensifyInitialValues(undefined),
  });

  public rocket = derivedAsync(() => {
    const id = this.latestLaunch()?.value?.rocket;
    if (id === undefined || id === null) return of(null);
    return this._rocketsService.getRocketById(id);
  });

  public nextLaunch = derivedAsync(() => this._launchesService.getNextLaunch(), {
    initialValue: getSuspensifyInitialValues(undefined),
  });
}
