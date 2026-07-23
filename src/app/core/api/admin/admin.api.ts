import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { DashboardMetricsAdminResponseDto } from './dto/dashboard-metrics-admin-response.dto';
import { EmployeesManagementMetricsAdminResponseDto } from './dto/employees-management-metrics-admin-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminApi {
  private http = inject(HttpClient);

  dashboardMetrics() {
    return this.http.get<DashboardMetricsAdminResponseDto>(
      `${environment.apiUrl}/admin/metrics/dashboard`,
    );
  }

  employeesManagementMetrics() {
    return this.http.get<EmployeesManagementMetricsAdminResponseDto>(
      `${environment.apiUrl}/admin/metrics/employees`,
    );
  }

  employeesManagementWithPagination(name: string | null, position: string | null, page: number) {
    let params = new HttpParams().set('page', page.toString());

    if (position) {
      params = params.set('position', position);
    }

    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(`${environment.apiUrl}/admin/management/employees`, { params });
  }

  appointmentsManagementWithPagination(status: string | null, page: number) {
    let params = new HttpParams().set('page', page.toString());

    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<any>(`${environment.apiUrl}/admin/management/appointments`, { params });
  }
}
