import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { LoginResponse } from '../auth/dto/login-response.dto';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AppointmentApi {
  private http = inject(HttpClient);

  create(dto: CreateAppointmentRequestDto) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/appointment`, dto);
  }
}
