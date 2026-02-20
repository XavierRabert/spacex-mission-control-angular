import { Routes } from '@angular/router';

export const ROCKETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/rockets/rockets-page').then((m) => m.RocketsPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/rockets/components/detail/rocket-detail').then((m) => m.RocketDetail),
  },
];
