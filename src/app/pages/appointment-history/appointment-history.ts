import { Component, inject, signal } from '@angular/core';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';
import { formatDate, formatTime } from '../../shared/utils/formatDateAndHour';
import { PatientEmployeeAppointmentResponseDto } from '../../core/api/appointment/dto/patient-employee-appointment-response.dto';
@Component({
  selector: 'app-appointment-history',
  imports: [],
  templateUrl: './appointment-history.html',
})
export class AppointmentHistory {
  protected readonly Math = Math;
  protected readonly formatDate = formatDate;
  protected readonly formatTime = formatTime;
  private readonly appointmentApi = inject(AppointmentApi);
  protected readonly appointments = signal<PatientEmployeeAppointmentResponseDto[]>([]);

  constructor() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentApi.findAllAppointmentsLinkedToTheUser().subscribe({
      next: (response) => {
        this.appointments.set(response);
        console.log(response);
      },
    });
  }

  cancelAppointment(appointmentId: number) {
    this.appointmentApi.cancel(appointmentId).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (error) => {
        if (
          error.status === 500 &&
          error.error?.message === "The appointment can only be cancelled with 24 hours' notice."
        ) {
          console.error('Error canceling appointment:', error);
        }
      },
    });
  }

  // TODO: Implement the downloadExam method to handle downloading the exam for a completed appointment.
  downloadExam(appointmentId: number) {}
}
