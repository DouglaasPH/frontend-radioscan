import { Component, inject } from '@angular/core';
import { UserStateService } from '../../../core/services/states/user-state.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ROUTES } from '../../../core/constants/routes.constants';
import { ROLES_IN_PORTUGUESE } from '../../../core/constants/roles.constants';
import { VisibilitySidebarService } from '../../../core/services/states/visibility-sidebar-state.service';

@Component({
  selector: 'component-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected readonly isMenuOpen = false;
  protected name = '';
  protected role = '';

  private readonly userState = inject(UserStateService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly visibilitySidebarService = inject(VisibilitySidebarService);

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
    this.visibilitySidebarService.toggle();
  }
}
