import { Injectable, computed, inject, signal } from '@angular/core';
import { PaginationKeys } from '@models/pagination';
import { PaginationService } from '@shared/components/pagination/services/pagination.service';
import { derivedAsync } from 'ngxtension/derived-async';
import { map, tap } from 'rxjs';
import { LaunchesApiService } from 'src/app/core/api/launchesApiService';
import { createSuspense, getSuspensifyInitialValues } from 'src/app/core/utils/suspense';

@Injectable({ providedIn: 'root' })
export class LaunchesService {
  private _launchesService = inject(LaunchesApiService);
  private _paginationService = inject(PaginationService);

  private _currentPaginationKey = signal<PaginationKeys | undefined>(undefined);
  public readonly currentPaginationKey = this._currentPaginationKey.asReadonly();
  private _paginatorConfig = computed(() =>
    this._paginationService.getPaginationConfig(this._currentPaginationKey()!).pagination(),
  );

  public launches = derivedAsync(
    () =>
      createSuspense(
        this._launchesService
          .getPastLaunches({
            filter: {},
            pageIndex: this._paginatorConfig().page,
            pageSize: this._paginatorConfig().limit,
          })
          .pipe(
            tap((response) => {
              this._paginationService.setResponse(PaginationKeys.LAUNCH_LIST, {
                totalCount: response.totalDocs || 0,
                totalPages: response.totalPages || 0,
              });
            }),
            map((response) => response.docs),
          ),
      ),
    {
      initialValue: getSuspensifyInitialValues([]),
    },
  );

  public setCurrentPaginationKey(key: PaginationKeys) {
    this._currentPaginationKey.set(key);
  }
}
