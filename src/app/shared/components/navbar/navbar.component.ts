import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/api/auth.api';
import { Router, RouterLink } from '@angular/router';
import { ROUTES } from '../../../core/constants/routes.constants';
import { ROLES_IN_PORTUGUESE } from '../../../core/constants/roles.constants';
import { UserState } from '../../../core/states/user.state';
import { VisibilitySidebarState } from '../../../core/states/visibility-sidebar.state';

@Component({
  selector: 'component-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected readonly isMenuOpen = false;
  protected name = '';
  protected role = '';

  private readonly userState = inject(UserState);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected visibilitySidebarState = inject(VisibilitySidebarState);

  constructor() {
    this.name = this.userState.get()!.name;
    this.role =
      ROLES_IN_PORTUGUESE[
        this.userState.getRoleOrEmployeePosition() as keyof typeof ROLES_IN_PORTUGUESE
      ];
  }

  protected logout() {
    this.authService.logout();
    this.router.navigate([ROUTES.LOGIN]);
  }

  protected toggleMenu() {
    this.visibilitySidebarState.toggle();
  }
}
