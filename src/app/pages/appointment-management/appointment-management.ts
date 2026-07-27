import { Component, effect, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  formatDate,
  formatTime,
  isLessThan24HoursAway,
} from '../../shared/utils/formatDateAndHour';
import { AppointmentsManagementResponseDto } from '../../core/api/appointment/dto/appointments-management-response.dto';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';

@Component({
  selector: 'app-appointment-management',
  imports: [RouterLink, NgClass, FormsModule],
  templateUrl: './appointment-management.html',
})
export class AppointmentManagement {
  protected readonly Math = Math;
  private readonly appointmentApi = inject(AppointmentApi);
  protected readonly formatDate = formatDate;
  protected readonly formatTime = formatTime;
  protected readonly isLessThan24HoursAway = isLessThan24HoursAway;

  protected readonly selectedAppointmentStatus = signal(''); // '' ou 'DOCTOR' ou 'TECHNICAL' para filtrar os funcionários por posição

  protected readonly appointments = signal<AppointmentsManagementResponseDto[]>([]); // Array para armazenar os funcionários

  protected readonly currentPage = signal(0); // Página atual
  protected readonly totalPages = signal(0); // Total de páginas disponíveis
  protected readonly totalAppointments = signal(0); // Total de consultas encontrados
  protected readonly numberOfElements = signal(0); // Número de elementos na página atual

  constructor() {
    effect(() => {
      this.selectedAppointmentStatus();

      untracked(() => {
        this.currentPage.set(0);
        this.loadEmployees();
      });
    });
  }

  loadEmployees() {
    this.appointmentApi
      .appointmentsManagementWithPagination(
        this.selectedAppointmentStatus(),
        this.currentPage(),
        null,
      )
      .subscribe({
        next: (response) => {
          this.appointments.set(response.content);
          this.totalAppointments.set(response.totalElements);
          this.totalPages.set(response.totalPages);
          this.numberOfElements.set(response.numberOfElements);
          console.log(response);
        },
      });
  }

  cancelAppointment(appointmentId: number) {
    this.appointmentApi.cancel(appointmentId).subscribe({
      next: () => {
        this.loadEmployees();
      },
    });
  }

  changePage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.totalPages()) {
      return;
    }

    this.currentPage.set(pageNumber);
    this.loadEmployees();
  }

  protected paginationPages() {
    const total = this.totalPages();
    const current = this.currentPage();

    let start = Math.max(0, current - 1);

    let end = Math.min(start + 3, total);

    if (end - start < 3) {
      start = Math.max(0, end - 3);
    }

    return Array.from({ length: end - start }, (_, index) => start + index);
  }
}
