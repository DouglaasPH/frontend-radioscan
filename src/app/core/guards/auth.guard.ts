import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROUTES } from '../constants/routes.constants';
import { AccessTokenState } from '../states/access-token.state';

export const authGuard: CanActivateFn = () => {
  const accessTokenState = inject(AccessTokenState);
  const router = inject(Router);

  if (accessTokenState.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([ROUTES.LOGIN]);
};
