import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    const role = payload.Role;

    if (role === 'Admin') {
      return true;
    }

    router.navigate(['/error']);
    return false;

  } catch {

    router.navigate(['/login']);
    return false;
  }
};