import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-appointment-management',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './appointment-management.html',
})
export class AppointmentManagement {}
