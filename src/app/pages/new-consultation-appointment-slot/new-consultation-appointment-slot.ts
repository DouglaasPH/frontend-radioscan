import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-new-consultation-appointment-slot',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './new-consultation-appointment-slot.html',
})
export class NewConsultationAppointmentSlot {}
