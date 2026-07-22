import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { DashboardRequestDto } from './dto/dashboard-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminApi {
  private http = inject(HttpClient);

  dashboard() {
    return this.http.get<DashboardRequestDto>(`${environment.apiUrl}/admin`);
  }
}
