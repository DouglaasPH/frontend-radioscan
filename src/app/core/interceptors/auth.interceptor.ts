import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AccessTokenStateService } from '../services/states/access-token-state.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessTokenState = inject(AccessTokenStateService);

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
