import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainPatientComponent } from './components/main-patient/main-patient.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, NavbarComponent, MainPatientComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {}
