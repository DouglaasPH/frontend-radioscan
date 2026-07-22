import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTES } from '../constants/routes.constants';
import { UserState } from '../states/user.state';
import { AccessTokenState } from '../states/access-token.state';

export const guestGuard: CanActivateFn = () => {
  const accessTokenState = inject(AccessTokenState);
  const userState = inject(UserState);

  const router = inject(Router);

  if (!accessTokenState.isAuthenticated()) {
    return true;
  }

  if (userState.getRoleOrEmployeePosition() === 'ADMIN') {
    return router.navigate([ROUTES.DASHBOARD_ADMIN]);
  } else if (userState.getRoleOrEmployeePosition() === 'PATIENT') {
    return router.navigate([ROUTES.DASHBOARD_PATIENT]);
  } else if (userState.getRoleOrEmployeePosition() === 'DOCTOR') {
    return router.navigate([ROUTES.DASHBOARD_DOCTOR]);
  } else if (userState.getRoleOrEmployeePosition() === 'TECHNICAL') {
    return router.navigate([ROUTES.DASHBOARD_TECHNICAL]);
  } else {
    return router.createUrlTree(['/error/500']);
  }
};
