import { Component, inject, Input, signal, OnInit } from '@angular/core';
import { Appointment } from '../../core/models/appointment.model';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';
import { formatDate, formatTime } from '../../shared/utils/formatDateAndHour';
import { XRayReportApi } from '../../core/api/x-ray-report/xRayReport.api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-view-consultation-details',
  imports: [FormsModule],
  templateUrl: './view-consultation-details.html',
})
export class ViewConsultationDetails {
  protected readonly formatDate = formatDate;
  protected readonly formatTime = formatTime;
  protected readonly appointment = signal<Appointment | null>(null);
  private readonly appointmentApi = inject(AppointmentApi);
  private readonly xRayReportApi = inject(XRayReportApi);
  protected readonly imageUrl = signal<string | null>(null);
  protected finalDiagnosis = signal<string | null>(null);
  private readonly router = inject(Router);

  @Input() appointmentId: number = 0;
  @Input() patientName: string = '';

  ngOnInit() {
    console.log(this.appointmentId);
    this.loadAppointment();
  }

  private loadAppointment() {
    this.appointmentApi.findByIdAppointment(Number(this.appointmentId)).subscribe({
      next: (response) => {
        this.appointment.set(response);

        console.log(response);
        this.loadExam(response);
      },
    });
  }

  private loadExam(appointment: Appointment) {
    console.log(appointment);
    this.xRayReportApi.getDownloadUrl(appointment.xRayReport!.id).subscribe({
      next: (response) => {
        this.imageUrl.set(response.downloadUrl);
      },
      error: (err) => {
        console.error('Erro ao obter URL da imagem:', err);
      },
    });
  }

  saveFinalDiagnosis() {
    if (this.finalDiagnosis == null || this.finalDiagnosis() === '') {
      return;
    }

    this.xRayReportApi
      .updateDiagnosisReport(this.appointment()?.id!, this.finalDiagnosis()!)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate([ROUTES.DASHBOARD_DOCTOR]);
        },
        error: (err) => {
          console.error('Erro ao obter URL da imagem:', err);
        },
      });
  }
}
