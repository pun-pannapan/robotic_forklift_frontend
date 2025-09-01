import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorage } from './token-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(TokenStorage);
  const token = store.getToken();

  const isLoginEndpoint = /\/api\/Auth\/login(\?|$)/i.test(req.url);

  if (!isLoginEndpoint && token && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};