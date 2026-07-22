import { Component, inject } from '@angular/core';
import { VisibilitySidebarService } from '../../../core/services/states/visibility-sidebar-state.service';
import { UserStateService } from '../../../core/services/states/user-state.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'component-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly userState = inject(UserStateService);

  protected readonly visibilitySidebarService = inject(VisibilitySidebarService);
  protected readonly role = this.userState.getRoleOrEmployeePosition() as string;

  constructor() {
    console.log(this.role == 'PATIENT');
  }
}
