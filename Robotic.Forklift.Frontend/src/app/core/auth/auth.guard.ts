import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { TokenStorage } from './token-storage.service';

const checkAuth = (url: string) => {
  const store = inject(TokenStorage);
  const router = inject(Router);

  if (store.isAuth()) return true;

  return router.createUrlTree(['/login'], { queryParams: { returnUrl: url } });
};

export const authGuard: CanActivateFn = (_route, state) => checkAuth(state.url);
export const authMatchGuard: CanMatchFn = (_route, segments) => {
  const url = '/' + segments.map(s => s.path).join('/');
  return checkAuth(url);
};