import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { LoginResponse } from '../auth/dto/login-response.dto';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { DashboardMetricsForEmployeeResponseDto } from './dto/dashboard-metrics-for-employee-response.dto';

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
}
