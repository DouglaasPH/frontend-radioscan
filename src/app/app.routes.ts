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
            path: 'schedule-an-appointment',
            component: ScheduleAnAppointment,
          },
          {
            path: 'appointment-history',
            component: AppointmentHistory,
          },
        ],
      },
      {
        path: 'dashboard/admin',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        children: [
          {
            path: '',
            component: DashboardAdmin,
          },
          {
            path: 'create-account-employee',
            component: CreateAccountEmployee,
          },
          {
            path: 'employee-management',
            component: EmployeeManagement,
          },
          {
            path: 'new-consultation-appointment-slot',
            component: NewConsultationAppointmentSlot,
          },
          {
            path: 'appointment-management',
            component: AppointmentManagement,
          },
        ],
      },
      {
        path: 'dashboard/doctor',
        canActivate: [roleGuard],
        data: { roles: ['DOCTOR'] },
        children: [
          {
            path: '',
            component: MyConsultations,
          },
          {
            path: 'consultation',
            component: ViewConsultationDetails,
          },
        ],
      },
      {
        path: 'dashboard/technical',
        canActivate: [roleGuard],
        data: { roles: ['TECHNICAL'] },
        children: [
          {
            path: '',
            component: MyConsultations,
          },
          {
            path: 'exam-upload',
            component: ExamUpload,
          },
        ],
      },
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: 'change-password',
        component: ChangePassword,
      },
    ],
  },
];
