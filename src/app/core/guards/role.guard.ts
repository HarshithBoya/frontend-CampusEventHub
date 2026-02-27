import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!user) {
    router.navigate(['/events']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[];

  if (allowedRoles?.includes(user?.role)) {
    return true;
  }

  router.navigate(['/events']);
  return false;
};