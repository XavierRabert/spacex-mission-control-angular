import { Routes } from '@angular/router';
import { Shell } from './core/layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'launches',
      },

      {
        path: 'launches',
        loadComponent: () =>
          import('@features/launches/launches-page/launches-page').then((m) => m.LaunchesPage),
      },

      {
        path: 'rockets',
        loadComponent: () =>
          import('@features/rockets/rockets-page/rockets-page').then((m) => m.RocketsPage),
      },

      {
        path: 'favorites',
        loadComponent: () =>
          import('@features/favorites/favorites-page/favorites-page').then((m) => m.FavoritesPage),
      },
    ],
  },

  // Optional: 404 fallback
  {
    path: '**',
    redirectTo: 'launches',
  },
];
