import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'events',
    loadComponent: () =>
      import('./features/events/event-list.component').then(
        (m) => m.EventListComponent
      ),
  },
  {
    path: 'admin/create-event',
    canActivate: [roleGuard],
    data: { roles: ['college_admin'] },
    loadComponent: () =>
      import('./features/events/create-event.component').then(
        (m) => m.CreateEventComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'events',
  },
];