import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RefreshTokenService } from './refresh-token.service';
import { tap } from 'rxjs';
import { environment } from '../../enviroments/environment.development';
import { RegisterPatientRequest } from '../dto/patient/register-patient-request.dto';
import { AccessTokenStateService } from './states/access-token-state.service';
import { LoginResponse } from '../dto/auth/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private http = inject(HttpClient);

  private accessTokenState = inject(AccessTokenStateService);
  private refreshTokenService = inject(RefreshTokenService);

  register(credentials: RegisterPatientRequest) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/patient/register`, credentials)
      .pipe(
        tap((response) => {
          console.log(response);
          this.accessTokenState.set(response.accessToken);
          this.refreshTokenService.set(response.refreshToken);
        }),
      );
  }
}
