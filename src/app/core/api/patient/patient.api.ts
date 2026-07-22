import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RefreshTokenService } from '../../services/refresh-token.service';
import { tap } from 'rxjs';
import { environment } from '../../../enviroments/environment.development';
import { RegisterPatientRequest } from './dto/register-patient-request.dto';
import { LoginResponse } from '../auth/dto/login-response.dto';
import { AccessTokenState } from '../../states/access-token.state';

@Injectable({
  providedIn: 'root',
})
export class PatientApi {
  private http = inject(HttpClient);

  private accessTokenState = inject(AccessTokenState);
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
