// error.interceptor.ts

import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        const statusCode = error.status || 500;

        router.navigate(['/error', statusCode]);
      }

      return throwError(() => error);
    }),
  );
};
