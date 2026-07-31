import { Component, effect, inject, signal, untracked } from '@angular/core';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';
import {
  formatDate,
  formatTime,
  isLessThan24HoursAway,
} from '../../shared/utils/formatDateAndHour';
import { AppointmentsManagementResponseDto } from '../../core/api/appointment/dto/appointments-management-response.dto';
import { RouterLink } from '@angular/router';
import { UserState } from '../../core/states/user.state';
import { NgClass } from '@angular/common';
import { AppointmentActionCellComponent } from './components/appointment-action-cell.component';

@Component({
  selector: 'app-dashboard-employee',
  imports: [RouterLink, NgClass, AppointmentActionCellComponent],
  templateUrl: './dashboard-employee.html',
})
export class DashboardEmployee {
  protected readonly Math = Math;
  private readonly appointmentApi = inject(AppointmentApi);
  private readonly userState = inject(UserState);
  protected readonly formatDate = formatDate;
  protected readonly formatTime = formatTime;
  protected readonly isLessThan24HoursAway = isLessThan24HoursAway;
  protected readonly metrics = signal({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
  });
  currentUserRole = signal(this.userState.getRoleOrEmployeePosition());

  protected readonly selectedAppointmentStatus = signal(''); // '' ou 'DOCTOR' ou 'TECHNICAL' para filtrar os funcionários por posição

  protected readonly appointments = signal<AppointmentsManagementResponseDto[]>([]); // Array para armazenar os funcionários

  protected readonly currentPage = signal(0); // Página atual
  protected readonly totalPages = signal(0); // Total de páginas disponíveis
  protected readonly totalAppointments = signal(0); // Total de consultas encontrados
  protected readonly numberOfElements = signal(0); // Número de elementos na página atual

  constructor() {
    this.loadMetrics();

    effect(() => {
      this.selectedAppointmentStatus();

      untracked(() => {
        this.currentPage.set(0);
        this.loadAppointment();
      });
    });
  }

  private loadMetrics() {
    this.appointmentApi.appointmentsManagementMetrics().subscribe({
      next: (response) => {
        this.metrics.set({
          totalAppointments: response.totalAppointments,
          completedAppointments: response.completedAppointments,
          pendingAppointments: response.pendingAppointments,
        });

        console.log(response);
      },
    });
  }

  loadAppointment() {
    this.appointmentApi
      .appointmentsManagementWithPagination(
        this.selectedAppointmentStatus(),
        this.currentPage(),
        this.userState.get()!.name,
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
        this.loadAppointment();
      },
    });
  }

  changePage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.totalPages()) {
      return;
    }

    this.currentPage.set(pageNumber);
    this.loadAppointment();
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
