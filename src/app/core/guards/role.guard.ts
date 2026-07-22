import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserStateService } from '../services/states/user-state.service';

export const roleGuard: CanActivateFn = (route) => {
  const userStateService = inject(UserStateService);

  const router = inject(Router);

  const user = userStateService.get();

  const allowedRoles = route.data['roles'];

  if (user && allowedRoles.includes(user.role)) {
    return true;
  }

  return router.createUrlTree(['/error/401']);
};
