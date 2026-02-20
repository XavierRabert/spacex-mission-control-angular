import { Injectable, computed, inject, signal } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import { catchError, map, of } from 'rxjs';
import { LaunchesApiService } from 'src/app/core/api/launchesApiService';
import { RocketsApiService } from 'src/app/core/api/rocketsApiService';
import { getSuspensifyInitialValues } from 'src/app/core/utils/suspense';

@Injectable({ providedIn: 'root' })
export class LaunchDetailService {
  private _launchesService = inject(LaunchesApiService);
  private _rocketsService = inject(RocketsApiService);

  private _launchId = signal<string | null>(null);
  public launchId = this._launchId.asReadonly();

  public launch = derivedAsync(
    () => {
      if (!this._launchId()) return;
      return this._launchesService.getLaunchById(this._launchId()!);
    },
    {
      initialValue: getSuspensifyInitialValues(undefined),
    },
  );

  public launchpad = derivedAsync(() => {
    const id = this.launch()?.value?.launchpad;
    if (!id) return of(null);
    return this._launchesService.getLaunchpadById(id);
  });

  public launchpadName = computed(() => this.launchpad()?.full_name || '');

  public rocket = derivedAsync(() => {
    const id = this.launch()?.value?.rocket;
    if (!id) return of(null);
    return this._rocketsService.getRocketById(id);
  });

  public rocketName = computed(() => this.rocket()?.value?.name || '');

  public setLaunchId(id: string) {
    this._launchId.set(id);
  }
}
