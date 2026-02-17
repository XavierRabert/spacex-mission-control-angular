import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LaunchesList } from './components/list/launches-list';
import { PaginationKeys } from '@models/pagination';
import { LaunchesService } from './services/launches.service';

@Component({
  selector: 'spx-launches-page',
  imports: [LaunchesList],
  templateUrl: './launches-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesPage {
  private _launchesService = inject(LaunchesService);

  public PaginationKeys = PaginationKeys;

  constructor() {
    this._launchesService.setCurrentPaginationKey(PaginationKeys.LAUNCH_LIST);
  }
}
