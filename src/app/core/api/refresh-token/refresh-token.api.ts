import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RefreshTokenService } from '../../services/refresh-token.service';
import { AccessTokenState } from '../../states/access-token.state';
import { environment } from '../../../enviroments/environment.development';
import { RefreshTokenResponse } from './refresh-token-response.dto';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenApi {
  private http = inject(HttpClient);

  private accessTokenState = inject(AccessTokenState);
  private refreshTokenService = inject(RefreshTokenService);

  refresh(): Observable<RefreshTokenResponse> {
    const refreshToken = this.refreshTokenService.get();

    return this.http
      .post<RefreshTokenResponse>(`${environment.apiUrl}/refresh-token/${refreshToken}`, {
        refreshToken,
      })
      .pipe(
        tap((response: RefreshTokenResponse) => {
          // O 'tap' executa essa ação assim que o valor chega,
          // mas continua repassando a resposta para quem chamou (o interceptor)
          this.accessTokenState.set(response.accessToken);
          this.refreshTokenService.set(response.refreshToken);
        }),
      );
  }
}
