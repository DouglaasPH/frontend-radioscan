export const ROUTES = {
  LOGIN: '/login',
  CREATE_ACCOUNT: '/create-account',
  TERMS_AND_CONDITIONS: '/create-account/terms-and-conditions',
  ERROR: '/error',
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/profile/change-password',

  // ONLY PATIENT
  DASHBOARD_PATIENT: '/dashboard/patient',
  SCHEDULE_AN_APPOINTMENT: '/dashboard/patient/schedule-an-appointment',
  APPOINTMENT_HISTORY: '/dashboard/patient/appointment-history',

  // ONLY ADMIN
  CREATE_ACCOUNT_EMPLOYEE: '/dashboard/admin/create-account-employee',
  EMPLOYEE_MANAGEMENT: '/dashboard/admin/employee-management',
  NEW_CONSULTATION_APPOINTMENT_SLOT: '/dashboard/admin/new-consultation-appointment-slot',
  DASHBOARD_ADMIN: '/dashboard/admin',
  APPOINTMENT_MANAGEMENT: '/dashboard/admin/appointment-management',

  // ONLY EMPLOYEE (DOCTOR)
  DASHBOARD_DOCTOR: '/dashboard/doctor',
  MY_CONSULTATIONS: '/dashboard/doctor/my-consultations',

  // ONLY EMPLOYEE (TECHNICAL)
  DASHBOARD_TECHNICAL: '/dashboard/technical',
  DASHBOARD_TECHNICAL_EXAM_UPLOAD: '/dashboard/technical-exam-upload',
};
