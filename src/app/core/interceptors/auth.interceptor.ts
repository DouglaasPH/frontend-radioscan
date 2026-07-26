import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AccessTokenState } from '../states/access-token.state';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthApi } from '../api/auth/auth.api';
import { RefreshTokenApi } from '../api/refresh-token/refresh-token.api';
import { RefreshTokenResponse } from '../api/refresh-token/refresh-token-response.dto';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessTokenState = inject(AccessTokenState);
  const authApi = inject(AuthApi);
  const refreshTokenApi = inject(RefreshTokenApi);

  const token = accessTokenState.get();

  if (!token) {
    return next(req);
  }

  const request = addTokenHeader(req, token);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !req.url.includes('/auth/refresh') &&
        error.error?.message === 'The JWT access token has expired.'
      ) {
        console.log('Handling 401 error...');
        return handle401Error(req, next, refreshTokenApi, authApi);
      }

      return throwError(() => error);
    }),
  );
};

function addTokenHeader(request: HttpRequest<unknown>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  refreshTokenApi: RefreshTokenApi,
  authApi: AuthApi,
) {
  console.log(!isRefreshing);
  if (!isRefreshing) {
    isRefreshing = true;

    return refreshTokenApi.refresh().pipe(
      switchMap((response: RefreshTokenResponse) => {
        isRefreshing = false;
        return next(addTokenHeader(req, response.accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authApi.logout();
        return throwError(() => err);
      }),
    );
  }

  return throwError(() => new Error('Refresh already in progress'));
}
