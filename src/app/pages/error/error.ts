import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from '../../core/states/user.state';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
})
export class Error {
  private userState = inject(UserState);
  private router = inject(Router);

  private MESSAGE = {
    401: ['Acesso não autorizado', 'Por favor, faça login para continuar.'],
    403: ['Acesso proibido', 'Você não tem permissão para visualizar esta página.'],
    404: ['Página não encontrada', 'A página solicitada não existe.'],
    500: ['Erro no servidor interno', 'Por favor, tente novamente mais tarde.'],
    503: ['Serviço indisponível', 'Por favor, tente novamente mais tarde.'],
    504: ['Tempo limite da gateway', 'O servidor está demorando muito para responder.'],
    505: [
      'Erro desconhecido',
      'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
    ],
  };
  protected code = input<string>();

  errorMessage(): Array<string> {
    switch (this.code()) {
      case '404':
        return this.MESSAGE[404];
      case '500':
        return this.MESSAGE[500];
      case '403':
        return this.MESSAGE[403];
      case '503':
        return this.MESSAGE[503];
      case '504':
        return this.MESSAGE[504];
      case '505':
        return this.MESSAGE[505];
      default:
        return this.MESSAGE[401];
    }
  }

  clickButton() {
    if (this.userState.get() !== null) {
      switch (this.userState.get()!.role) {
        case 'ADMIN':
          this.router.navigate([ROUTES.DASHBOARD_ADMIN]);
          break;
        case 'PATIENT':
          this.router.navigate([ROUTES.DASHBOARD_PATIENT]);
          break;
        case 'EMPLOYEE':
          if (this.userState.get()!.employee?.position === 'DOCTOR') {
            this.router.navigate([ROUTES.DASHBOARD_DOCTOR]);
          } else if (this.userState.get()!.employee?.position === 'TECHNICAL') {
            this.router.navigate([ROUTES.DASHBOARD_TECHNICAL]);
          }
          break;
      }
    } else {
      this.router.navigate([ROUTES.LOGIN]);
    }
  }
}
