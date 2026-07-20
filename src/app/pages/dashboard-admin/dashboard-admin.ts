import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-admin',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin {}
