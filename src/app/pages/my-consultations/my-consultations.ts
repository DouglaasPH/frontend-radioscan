import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-my-consultations',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './my-consultations.html',
})
export class MyConsultations {}
