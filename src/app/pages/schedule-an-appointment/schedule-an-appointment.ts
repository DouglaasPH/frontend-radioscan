import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-schedule-an-appointment',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  templateUrl: './schedule-an-appointment.html',
})
export class ScheduleAnAppointment {
  minDate = new Date();

  constructor() {
    this.minDate.setDate(this.minDate.getDate() + 1);
  }
  selected = model<Date | null>(null);
}
