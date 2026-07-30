import { Component, effect, inject, Input, model, signal, untracked } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';
import { AllAvailabilitiesAppointmentsResponseDto } from '../../core/api/appointment/dto/all-availabilities-appointments-response.dto';
import { formatDate, formatTime } from '../../shared/utils/formatDateAndHour';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';

function getTomorrow(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

@Component({
  selector: 'app-schedule-an-appointment',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, NgClass],
  templateUrl: './schedule-an-appointment.html',
})
export class ScheduleAnAppointment {
  protected readonly Math = Math;
  protected readonly formatDate = formatDate;
  protected readonly formatTime = formatTime;
  private readonly router = inject(Router);
  protected minDate = new Date();
  protected selectedAppointmentType = signal('');
  protected selectedDate = signal<Date>(getTomorrow());
  private readonly appointmentApi = inject(AppointmentApi);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly appointments = signal<AllAvailabilitiesAppointmentsResponseDto[]>([]);

  protected readonly currentPage = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly totalEmployees = signal(0);
  protected readonly numberOfElements = signal(0);

  @Input() xRayReportId: string = '';

  ngOnInit(): void {
    // 1. Pegue o parâmetro real da rota via paramMap ou use o @Input()
    const reportIdFromRoute = this.activatedRoute.snapshot.paramMap.get('xRayReportId');
    const currentPath = this.activatedRoute.snapshot.routeConfig?.path;

    console.log('ID do Laudo:', this.xRayReportId || reportIdFromRoute);

    // 2. Verifique se o parâmetro existe ou se a rota contém 'capture-exam'
    if (currentPath?.includes('capture-exam')) {
      this.selectedAppointmentType.set('EXAM_CAPTURE');
    } else if (reportIdFromRoute || this.xRayReportId) {
      this.selectedAppointmentType.set('REPORT_REVIEW');
    }
  }

  constructor() {
    this.minDate.setDate(this.minDate.getDate() + 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.selectedDate.set(tomorrow);

    effect(() => {
      this.selectedDate();
      this.selectedAppointmentType();

      untracked(() => {
        this.currentPage.set(0);
        this.loadAppointments();
      });
    });
  }

  loadAppointments() {
    this.appointmentApi
      .allAvailabilitiesAppointments(
        this.selectedAppointmentType(),
        this.selectedDate()?.toISOString() || '',
        this.currentPage(),
      )
      .subscribe({
        next: (response) => {
          this.appointments.set(response.content);
          this.totalEmployees.set(response.totalElements);
          this.totalPages.set(response.totalPages);
          this.numberOfElements.set(response.numberOfElements);
          console.log(response);
        },
      });
  }

  changePage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.totalPages()) {
      return;
    }

    this.currentPage.set(pageNumber);
    this.loadAppointments();
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

  protected onSelectedAppointment(appointmentId: number) {
    if (this.selectedAppointmentType() === 'EXAM_CAPTURE') {
      this.appointmentApi.bookExamCapture(appointmentId).subscribe({
        next: (response) => {
          this.router.navigate([ROUTES.DASHBOARD_PATIENT]);
        },
      });
    } else if (this.selectedAppointmentType() === 'REPORT_REVIEW') {
      this.appointmentApi.bookReportReview(appointmentId, Number(this.xRayReportId)).subscribe({
        next: (response) => {
          this.router.navigate([ROUTES.DASHBOARD_PATIENT]);
        },
      });
    }
  }
}
