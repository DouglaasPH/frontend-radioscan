import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SidebarComponent } from '../dashboard/components/sidebar/sidebar.component';
import { NavbarComponent } from '../dashboard/components/navbar/navbar.component';

@Component({
  selector: 'app-schedule-an-appointment',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, SidebarComponent, NavbarComponent],
  templateUrl: './schedule-an-appointment.html',
})
export class ScheduleAnAppointment {
  minDate = new Date();

  constructor() {
    this.minDate.setDate(this.minDate.getDate() + 1);
  }
  selected = model<Date | null>(null);
}
