import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingState } from '../states/loading.state';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingState = inject(LoadingState);

  loadingState.start();

  return next(req).pipe(
    finalize(() => {
      loadingState.stop();
    }),
  );
};
