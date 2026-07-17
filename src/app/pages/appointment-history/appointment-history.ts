import { Component } from '@angular/core';
import { NavbarComponent } from '../dashboard/components/navbar/navbar.component';
import { SidebarComponent } from '../dashboard/components/sidebar/sidebar.component';

@Component({
  selector: 'app-appointment-history',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './appointment-history.html',
})
export class AppointmentHistory {}
