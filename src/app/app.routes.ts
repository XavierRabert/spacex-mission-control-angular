import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        loadComponent: () => import('@features/home/home-page').then((m) => m.HomePage),
      },
      {
        path: 'launches',
        loadChildren: () =>
          import('@features/launches/launches.routes').then((m) => m.LAUNCHES_ROUTES),
      },
      {
        path: 'rockets',
        loadChildren: () =>
          import('@features/rockets/rockets.routes').then((m) => m.ROCKETS_ROUTES),
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
