import { Injectable, inject, signal } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { LaunchesApiService } from 'src/app/core/api/launchesApiService.service';
import { getSuspensifyInitialValues } from 'src/app/core/utils/suspense';

@Injectable({ providedIn: 'root' })
export class LaunchesService {
  private _launchesService = inject(LaunchesApiService);

  private _launchId = signal<string | null>(null);
  public launchId = this._launchId.asReadonly();

  public launches = derivedAsync(() => this._launchesService.getPastLaunches(), {
    initialValue: getSuspensifyInitialValues([]),
  });

  public launchDetail = derivedAsync(
    () => {
      if (!this._launchId()) return;
      return this._launchesService.getLaunchById(this._launchId()!);
    },
    {
      initialValue: getSuspensifyInitialValues(undefined),
    },
  );

  public setLaunchId(id: string) {
    this._launchId.set(id);
  }
}
