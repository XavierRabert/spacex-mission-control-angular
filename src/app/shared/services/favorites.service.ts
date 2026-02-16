import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  public favorites = signal<string[]>(this._loadFromStorage());

  private _loadFromStorage(): string[] {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  }

  public add(id: string) {
    if (!this.favorites().includes(id)) {
      this.favorites.set([...this.favorites(), id]);
      this._save();
    }
  }

  public remove(id: string) {
    this.favorites.set(this.favorites().filter((f) => f !== id));
    this._save();
  }

  private _save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites()));
  }
}
