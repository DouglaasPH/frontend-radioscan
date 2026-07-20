import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account-patient/create-account-patient';
import { TermsAndConditions } from './pages/terms-and-conditions/terms-and-conditions';
import { Error } from './pages/error/error';
import { ScheduleAnAppointment } from './pages/schedule-an-appointment/schedule-an-appointment';
import { AppointmentHistory } from './pages/appointment-history/appointment-history';
import { Profile } from './pages/profile/profile';
import { ChangePassword } from './pages/change-password/change-password';
import { CreateAccountEmployee } from './pages/create-account-employee/create-account-employee';
import { EmployeeManagement } from './pages/employee-management/employee-management';
import { NewConsultationAppointmentSlot } from './pages/new-consultation-appointment-slot/new-consultation-appointment-slot';
import { DashboardPatient } from './pages/dashboard-patient/dashboard';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';

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
    component: DashboardPatient,
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
  {
    path: 'dashboard/admin/create-account-employee',
    component: CreateAccountEmployee,
  },
  {
    path: 'dashboard/admin/employee-management',
    component: EmployeeManagement,
  },
  {
    path: 'dashboard/admin/new-consultation-appointment-slot',
    component: NewConsultationAppointmentSlot,
  },
  {
    path: 'dashboard/admin',
    component: DashboardAdmin,
  },
];
