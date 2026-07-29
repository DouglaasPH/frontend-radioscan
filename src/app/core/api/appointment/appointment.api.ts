import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { LoginResponse } from '../auth/dto/login-response.dto';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { DashboardMetricsForEmployeeResponseDto } from './dto/dashboard-metrics-for-employee-response.dto';
import { Appointment } from '../../models/appointment.model';
import { PatientEmployeeAppointmentResponseDto } from './dto/patient-employee-appointment-response.dto';
import { RequestUploadResponseDto } from './dto/request-upload-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AppointmentApi {
  private http = inject(HttpClient);

  create(dto: CreateAppointmentRequestDto) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/appointment`, dto);
  }

  cancel(appointmentId: number) {
    return this.http.put<LoginResponse>(
      `${environment.apiUrl}/appointment/${appointmentId}/cancel`,
      {},
    );
  }

  appointmentsManagementWithPagination(
    status: string | null,
    page: number,
    employeeName: string | null,
  ) {
    let params = new HttpParams().set('page', page.toString());

    if (status) {
      params = params.set('status', status);
    }

    if (employeeName) {
      params = params.set('employeeName', employeeName);
    }

    return this.http.get<any>(`${environment.apiUrl}/appointment/management`, {
      params,
    });
  }

  appointmentsManagementMetrics() {
    return this.http.get<DashboardMetricsForEmployeeResponseDto>(
      `${environment.apiUrl}/appointment/metrics`,
    );
  }

  allAvailabilitiesAppointments(appointmentType: String, date: String, page: number) {
    let params = new HttpParams().set('page', page.toString());
    params = params.set('appointmentType', appointmentType.toString());
    params = params.set('date', date.toString());

    return this.http.get<any>(`${environment.apiUrl}/appointment/available`, {
      params,
    });
  }

  bookAppointment(appointmentId: Number) {
    return this.http.put<Appointment>(
      `${environment.apiUrl}/appointment/${appointmentId}/book`,
      null,
    );
  }

  findAllAppointmentsLinkedToTheUser() {
    return this.http.get<PatientEmployeeAppointmentResponseDto[]>(
      `${environment.apiUrl}/appointment`,
    );
  }

  requestUpload(appointmentId: number) {
    return this.http.post<RequestUploadResponseDto>(
      `${environment.apiUrl}/appointment/${appointmentId}/request-upload`,
      null,
    );
  }
}
