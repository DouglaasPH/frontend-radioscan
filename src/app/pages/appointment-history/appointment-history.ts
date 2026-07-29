import { Component, inject, signal } from '@angular/core';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';
import { formatDate, formatTime } from '../../shared/utils/formatDateAndHour';
import { PatientEmployeeAppointmentResponseDto } from '../../core/api/appointment/dto/patient-employee-appointment-response.dto';
import { XRayReportApi } from '../../core/api/x-ray-report/xRayReport.api';
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
  private readonly xRayReportApi = inject(XRayReportApi);
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

  downloadExam(reportId: number): void {
    this.xRayReportApi.getDownloadUrl(reportId).subscribe({
      next: (response) => {
        if (response && response.downloadUrl) {
          // Método A: Força o download via Blob mantendo o nome do arquivo limpo
          this.xRayReportApi.downloadFileFromUrl(
            response.downloadUrl,
            `raio-x-exame-${reportId}.png`,
          );

          // Método B (Alternativo simples): Abre a imagem em uma nova aba do navegador
          // window.open(response.downloadUrl, '_blank');
        }
      },
      error: (err) => {
        console.error('Erro ao obter URL de download:', err);
        alert(err.error?.message || 'Erro ao gerar link de download do exame.');
      },
    });
  }
}
