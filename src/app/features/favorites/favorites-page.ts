import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FavoritesList } from './components/list/favorites-list';

@Component({
  selector: 'spx-favorites-page',
  imports: [FavoritesList],
  templateUrl: './favorites-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPage {}
