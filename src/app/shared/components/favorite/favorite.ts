import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FavoritesService } from '@features/favorites/services/favorites';
import { FavoriteType } from '@models/favorites/favorites';

@Component({
  selector: 'spx-favorite',
  imports: [],
  template: `
    <button
      class="w-5 h-5
             grid place-items-center
             bg-zinc-950/60
             backdrop-blur-sm
             border border-cyan-400/20
             hover:border-cyan-400/60
             hover:bg-zinc-900/80
             transition-all duration-300
             cursor-pointer
             outline-none"
      [class.border-cyan-400]="isFavorite()"
      [class.bg-zinc-900]="isFavorite()"
      (click)="toggleFavorite($event)"
      [attr.aria-label]="isFavorite() ? 'Remove from favorites' : 'Add to favorites'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-4 h-4 transition-all duration-300"
        [style.filter]="
          isFavorite()
            ? 'drop-shadow(0 0 5px rgba(34,211,238,1)) drop-shadow(0 0 10px rgba(34,211,238,0.5))'
            : 'none'
        "
      >
        <!-- Estrella de 6 puntes correcta: dos triangles superposats -->
        <polygon
          points="12,2 14.2,8.5 21,8.5 15.5,12.8 17.8,19.5 12,15.5 6.2,19.5 8.5,12.8 3,8.5 9.8,8.5"
          [attr.fill]="isFavorite() ? 'rgba(34,211,238,1)' : 'none'"
          [attr.stroke]="isFavorite() ? 'rgba(34,211,238,1)' : 'rgba(34,211,238,0.5)'"
          stroke-width="1.2"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorite {
  private _favorites = inject(FavoritesService);

  public id = input.required<string>();
  public favoriteType = input.required<FavoriteType>();

  public isFavorite = computed<boolean>(() =>
    this._favorites.isFavorite(this.favoriteType(), this.id()),
  );

  public toggleFavorite(event: Event) {
    event.stopPropagation();
    this._favorites.toggle(this.favoriteType(), this.id());
  }
}
