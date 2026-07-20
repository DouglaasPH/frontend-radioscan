import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-employee-management',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './employee-management.html',
})
export class EmployeeManagement {}
