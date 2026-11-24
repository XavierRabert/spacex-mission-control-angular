import { Injectable, inject } from '@angular/core';
import { getSuspensifyInitialValues } from 'src/app/core/utils/suspense';
import { LaunchesApiService } from 'src/app/core/api/launchesApiService';
import { derivedAsync } from 'ngxtension/derived-async';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private _launchesService = inject(LaunchesApiService);

  public latestLaunch = derivedAsync(() => this._launchesService.getLatestLaunch(), {
    initialValue: getSuspensifyInitialValues(undefined),
  });

  public nextLaunch = derivedAsync(() => this._launchesService.getNextLaunch(), {
    initialValue: getSuspensifyInitialValues(undefined),
  });
}
