import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.html',
})
export class DashboardPatient {}
