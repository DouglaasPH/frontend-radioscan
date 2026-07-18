import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account/create-account';
import { TermsAndConditions } from './pages/terms-and-conditions/terms-and-conditions';
import { Error } from './pages/error/error';
import { Dashboard } from './pages/dashboard/dashboard';
import { ScheduleAnAppointment } from './pages/schedule-an-appointment/schedule-an-appointment';
import { AppointmentHistory } from './pages/appointment-history/appointment-history';
import { Profile } from './pages/profile/profile';
import { ChangePassword } from './pages/change-password/change-password';

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
  {
    path: 'dashboard/patient',
    component: Dashboard,
  },
  {
    path: 'dashboard/patient/schedule-an-appointment',
    component: ScheduleAnAppointment,
  },
  {
    path: 'dashboard/patient/appointment-history',
    component: AppointmentHistory,
  },
  {
    path: 'dashboard/patient/profile',
    component: Profile,
  },
  {
    path: 'dashboard/patient/profile/change-password',
    component: ChangePassword,
  },
];
