import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';
import { AuthService } from '../../core/api/auth.api';
import { UserService } from '../../core/api/user.api';
import { environment } from '../../enviroments/environment.development';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login implements AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly showError = signal(false);

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,

      callback: (response: any) => {
        this.loginWithGoogle(response.credential);
      },
    });

    google.accounts.id.renderButton(
      document.getElementById('googleButton'),

      {
        theme: 'outline',
        size: 'large',
      },
    );
  }

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected signInGoogle(): void {
    google.accounts.oauth2.initTokenClient();
  }

  protected clickButton(): void {
    const button = document.querySelector('#googleButton div[role=button]') as HTMLElement;

    button?.click();
  }

  protected loginWithGoogle(googleToken: string): void {
    console.log('Google Token:', googleToken);
    this.authService.loginGoogle({ googleToken }).subscribe({
      next: (response) => {
        console.log(response);
        this.userService.me().subscribe({
          next: (response) => {
            this.redirectByUserRole(response.role);
          },
          error: (err) => console.log(err),
        });
      },
      error: (error) => this.handleAuthError(error),
    });
  }

  protected loginWithoutGoogle(): void {
    if (this.loginForm.invalid) return;

    this.showError.set(false);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        console.log(response);
        this.userService.me().subscribe({
          next: (response) => {
            this.redirectByUserRole(response.role);
          },
          error: (err) => console.log(err),
        });
      },
      error: (error) => this.handleAuthError(error),
    });
  }

  protected togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  private redirectByUserRole(role: string): void {
    const roleRoutes: Record<string, string> = {
      ADMIN: ROUTES.DASHBOARD_ADMIN,
      PATIENT: ROUTES.DASHBOARD_PATIENT,
      DOCTOR: ROUTES.DASHBOARD_DOCTOR,
      TECHNICAL: ROUTES.DASHBOARD_TECHNICAL,
    };

    const targetRoute = roleRoutes[role] || '/error/500';
    this.router.navigate([targetRoute]);
  }

  private handleAuthError(error: any): void {
    console.error('Erro na autenticação:', error);
    if (error?.status === 401 || error?.error?.status === 401) {
      this.showError.set(true);
    }
  }
}
