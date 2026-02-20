import { Component, inject } from '@angular/core';
import { RocketsList } from './components/list/rockets-list';
import { RocketsService } from './services/rockets.service';
import { PaginationKeys } from '@models/pagination';

@Component({
  selector: 'spx-rockets-page',
  imports: [RocketsList],
  templateUrl: './rockets-page.html',
})
export class RocketsPage {
  private _rocketsService = inject(RocketsService);

  public PaginationKeys = PaginationKeys;

  constructor() {
    this._rocketsService.setCurrentPaginationKey(PaginationKeys.ROCKET_LIST);
  }
}
