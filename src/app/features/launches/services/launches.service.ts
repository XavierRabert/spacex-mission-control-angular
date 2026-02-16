import { Injectable, inject } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { LaunchesApiService } from 'src/app/core/api/launchesApiService.service';
import { getSuspensifyInitialValues, SuspenseSignal } from 'src/app/core/utils/suspense';

@Injectable({ providedIn: 'root' })
export class LaunchesService {
  private _launchesService = inject(LaunchesApiService);

  public launches = this._launchesService.getPastLaunches();
}
