import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { DashboardMetricsAdminResponseDto } from './dto/dashboard-metrics-admin-response.dto';

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
}
