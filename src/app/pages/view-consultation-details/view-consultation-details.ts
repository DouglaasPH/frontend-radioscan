import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-view-consultation-details',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './view-consultation-details.html',
})
export class ViewConsultationDetails {}
