import { Component } from '@angular/core';
import { NavbarComponent } from '../dashboard/components/navbar/navbar.component';
import { SidebarComponent } from '../dashboard/components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './profile.html',
})
export class Profile {}
