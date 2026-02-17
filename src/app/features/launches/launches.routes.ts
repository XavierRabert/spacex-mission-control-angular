import { Routes } from '@angular/router';

export const LAUNCHES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/launches/launches-page').then((m) => m.LaunchesPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/launches/components/detail/launch-detail').then((m) => m.LaunchDetail),
  },
];
