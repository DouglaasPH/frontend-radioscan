import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account/create-account';
import { TermsAndConditions } from './pages/terms-and-conditions/terms-and-conditions';
import { Error } from './pages/error/error';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'create-account',
    component: CreateAccount,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditions,
  },
  {
    path: 'error',
    component: Error,
  },
];
