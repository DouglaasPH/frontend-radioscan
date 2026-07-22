import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROUTES } from '../constants/routes.constants';
import { AccessTokenStateService } from '../services/states/access-token-state.service';

export const authGuard: CanActivateFn = () => {
  const accessTokenState = inject(AccessTokenStateService);
  const router = inject(Router);

  if (accessTokenState.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([ROUTES.LOGIN]);
};
