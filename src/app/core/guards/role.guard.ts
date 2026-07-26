import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserState } from '../states/user.state';

export const roleGuard: CanActivateFn = (route) => {
  const userState = inject(UserState);

  const router = inject(Router);

  const user = userState.get();

  const allowedRoles = route.data['roles'];
  console.log(user);
  console.log('Allowed Roles:', allowedRoles);

  if (user?.employee !== null && allowedRoles.includes(user!.employee.position)) {
    return true;
  }

  if (user && allowedRoles.includes(user.role)) {
    return true;
  }

  return router.createUrlTree(['/error/401']);
};
