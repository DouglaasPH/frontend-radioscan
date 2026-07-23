import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { RegisterEmployeeRequest } from './dto/register-employee-request.dto';
import { LoginResponse } from '../auth/dto/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApi {
  private http = inject(HttpClient);

  register(credentials: RegisterEmployeeRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/employee/register`, credentials);
  }
}
