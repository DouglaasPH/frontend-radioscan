import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { RegisterEmployeeRequest } from './dto/register-employee-request.dto';
import { LoginResponse } from '../auth/dto/login-response.dto';
import { EmployeesManagementMetricsForAdminResponseDto } from './dto/employees-management-metrics-for-admin-response.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApi {
  private http = inject(HttpClient);

  register(credentials: RegisterEmployeeRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/employee/register`, credentials);
  }

  employeesManagementMetrics() {
    return this.http.get<EmployeesManagementMetricsForAdminResponseDto>(
      `${environment.apiUrl}/employee/metrics/admin`,
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
    return this.http.get<any>(`${environment.apiUrl}/employee/management/admin`, { params });
  }
}
