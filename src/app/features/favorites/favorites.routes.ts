import { Routes } from '@angular/router';

export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/favorites/favorites-page').then((m) => m.FavoritesPage),
  },
];
