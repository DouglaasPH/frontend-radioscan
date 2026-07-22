import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccountPatient } from './pages/create-account-patient/create-account-patient';
import { TermsAndConditions } from './pages/terms-and-conditions/terms-and-conditions';
import { Error } from './pages/error/error';
import { ScheduleAnAppointment } from './pages/schedule-an-appointment/schedule-an-appointment';
import { AppointmentHistory } from './pages/appointment-history/appointment-history';
import { Profile } from './pages/profile/profile';
import { ChangePassword } from './pages/change-password/change-password';
import { CreateAccountEmployee } from './pages/create-account-employee/create-account-employee';
import { EmployeeManagement } from './pages/employee-management/employee-management';
import { NewConsultationAppointmentSlot } from './pages/new-consultation-appointment-slot/new-consultation-appointment-slot';
import { DashboardPatient } from './pages/dashboard-patient/dashboard-patient';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { AppointmentManagement } from './pages/appointment-management/appointment-management';
import { MyConsultations } from './pages/my-consultations/my-consultations';
import { ViewConsultationDetails } from './pages/view-consultation-details/view-consultation-details';
import { ExamUpload } from './pages/exam-upload/exam-upload';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'create-account',
    component: CreateAccountPatient,
  },
  {
    path: 'create-account/terms-and-conditions',
    component: TermsAndConditions,
    canActivate: [guestGuard],
  },
  {
    path: 'error/:code',
    component: Error,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard/patient',
        canActivate: [roleGuard],
        data: { roles: ['PATIENT'] },
        children: [
          {
            path: '',
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
        ],
      },
      {
        path: '',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        children: [
          {
            path: '',
            component: DashboardAdmin,
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
            path: 'dashboard/admin/appointment-management',
            component: AppointmentManagement,
          },
        ],
      },
      {
        path: '',
        canActivate: [roleGuard],
        data: { roles: ['DOCTOR'] },
        children: [
          {
            path: 'dashboard/doctor',
            component: MyConsultations,
          },
          {
            path: 'dashboard/doctor/consultation',
            component: ViewConsultationDetails,
          },
        ],
      },
      {
        path: '',
        canActivate: [roleGuard],
        data: { roles: ['TECHNICAL'] },
        children: [
          {
            path: 'dashboard/technical',
            component: MyConsultations,
          },
          {
            path: 'dashboard/technical/exam-upload',
            component: ExamUpload,
          },
        ],
      },
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: 'profile/change-password',
        component: ChangePassword,
      },
    ],
  },
];
