// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  console.log('AuthGuard invoked. Token:', token, 'State URL:', state.url);
  const router = inject(Router);
  return token ? true : router.parseUrl('/login');
};
