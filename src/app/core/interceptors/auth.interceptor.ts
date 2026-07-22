import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AccessTokenState } from '../states/access-token.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessTokenState = inject(AccessTokenState);

  const token = accessTokenState.get();

  console.log('Token from authInterceptor:', token);

  if (!token) {
    return next(req);
  }

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(request);
};
