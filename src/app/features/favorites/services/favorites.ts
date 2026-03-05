import { Injectable, signal } from '@angular/core';
import { Favorites, FavoriteType } from '@models/favorites/favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'spx-favorites';

  private readonly _favorites = signal<Favorites>(this.load());

  readonly favorites = this._favorites.asReadonly();

  private load(): Favorites {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._favorites()));
  }

  public toggle(type: FavoriteType, id: string) {
    const current = this._favorites();

    const exists = current.some((f) => f.type === type && f.id === id);

    const updated = exists
      ? current.filter((f) => !(f.type === type && f.id === id))
      : [...current, { type, id }];

    this._favorites.set(updated);
    this.save();
  }

  public isFavorite(type: FavoriteType, id: string): boolean {
    return this._favorites().some((f) => f.type === type && f.id === id);
  }

  public getByType(type: FavoriteType): string[] {
    return this._favorites()
      .filter((f) => f.type === type)
      .map((f) => f.id);
  }

  public clear() {
    this._favorites.set([]);
    this.save();
  }
}
