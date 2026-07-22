import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../dto/auth/login-request.dto';
import { LoginResponse } from '../dto/auth/login-response.dto';
import { RefreshTokenService } from './refresh-token.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { environment } from '../../enviroments/environment.development';
import { AccessTokenStateService } from './states/access-token-state.service';
import { UserStateService } from './states/user-state.service';
import { GoogleAuthRequest } from '../dto/auth/google-auth-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private accessTokenStateService = inject(AccessTokenStateService);
  private refreshTokenService = inject(RefreshTokenService);
  private userState = inject(UserStateService);

  initAuth() {
    const refreshToken = this.refreshTokenService.get();

    // Se não houver refreshToken salvo, prossegue com o boot da aplicação normalmente
    if (!refreshToken) {
      return of(false);
    }

    // 1. Faz o refresh para pegar o accessToken novo
    return this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}/refresh-token/${refreshToken}`, {})
      .pipe(
        tap((response) => {
          // Salva o novo accessToken no State
          this.accessTokenStateService.set(response.accessToken);
        }),
        // 2. Com o token atualizado no State, busca os dados do usuário logado
        switchMap(() => this.http.get<any>(`${environment.apiUrl}/user/me`)),
        tap((user) => {
          // Salva os dados do usuário no State
          this.userState.set(user);
        }),
        // Tratamento se o refreshToken for inválido/expirado
        catchError((error) => {
          console.warn('Sessão expirada. Limpando credenciais locais...', error);
          localStorage.removeItem('refreshToken');
          this.refreshTokenService.clear();
          this.accessTokenStateService.clear();
          this.userState.clear();
          return of(false); // Não trava a inicialização do app se falhar
        }),
      );
  }

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.accessTokenStateService.set(response.accessToken);
        this.refreshTokenService.set(response.refreshToken);
      }),
    );
  }

  refresh() {
    const refreshToken = this.refreshTokenService.get();

    return this.http
      .post<LoginResponse>('/refresh', {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          this.accessTokenStateService.set(response.accessToken);

          this.refreshTokenService.set(response.refreshToken);
        }),
      );
  }

  loginGoogle(dto: GoogleAuthRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login/google`, dto).pipe(
      tap((response) => {
        this.accessTokenStateService.set(response.accessToken);
        this.refreshTokenService.set(response.refreshToken);
        console.log('access token: ', this.accessTokenStateService.get());
        console.log('refresh token: ', this.refreshTokenService.get());
      }),
    );
  }

  logout(): void {
    this.accessTokenStateService.clear();
    this.refreshTokenService.clear();
    this.userState.clear();
  }
}
