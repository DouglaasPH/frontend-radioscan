import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserState } from '../../../core/states/user.state';
import { VisibilitySidebarState } from '../../../core/states/visibility-sidebar.state';

@Component({
  selector: 'component-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  protected readonly userState = inject(UserState);
  protected readonly visibilitySidebarState = inject(VisibilitySidebarState);
  protected readonly role = this.userState.getRoleOrEmployeePosition() as string;
  protected readonly windowWidth = window.innerWidth;

  protected toggleMenu() {
    this.visibilitySidebarState.toggle();
  }
}
