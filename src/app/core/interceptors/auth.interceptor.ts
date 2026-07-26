import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AccessTokenState } from '../states/access-token.state';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthApi } from '../api/auth/auth.api';
import { RefreshTokenApi } from '../api/refresh-token/refresh-token.api';
import { RefreshTokenResponse } from '../api/refresh-token/refresh-token-response.dto';

// Variáveis de estado global do interceptor
let isRefreshing = false;
// Guarda o novo token para as requisições pendentes. Null indica que está atualizando.
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessTokenState = inject(AccessTokenState);
  const authApi = inject(AuthApi);
  const refreshTokenApi = inject(RefreshTokenApi);
  const router = inject(Router);

  const token = accessTokenState.get();

  const request = token ? addTokenHeader(req, token) : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !req.url.includes('/auth/refresh') &&
        error.error?.message === 'The JWT access token has expired.'
      ) {
        return handle401Error(req, next, refreshTokenApi, authApi, router);
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
  router: Router,
) {
  if (!isRefreshing) {
    isRefreshing = true;
    // Reseta o subject para bloquear chamadas simultâneas
    refreshTokenSubject.next(null);

    return refreshTokenApi.refresh().pipe(
      switchMap((response: RefreshTokenResponse) => {
        isRefreshing = false;

        // Emite o novo token para destravar as requisições que estavam aguardando
        refreshTokenSubject.next(response.accessToken);

        // Executa a requisição original que gerou o 401
        return next(addTokenHeader(req, response.accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        refreshTokenSubject.next(null);

        // Se o refresh expirar ou falhar, limpa o estado e força o redirecionamento
        authApi.logout();
        router.navigate(['/login']);

        return throwError(() => err);
      }),
    );
  } else {
    // Se já houver um refresh em andamento, aguarda o refreshTokenSubject emitir o novo token
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null), // Espera até que venha um token válido (diferente de null)
      take(1), // Pega apenas uma emissão para concluir
      switchMap((token) => next(addTokenHeader(req, token))), // Refaz a requisição com o novo token
    );
  }
}
