import { Employee } from './employee.model';
import { Patient } from './patient.model';

export enum AppointmentStatus {
  AVAILABLE = 1,
  SCHEDULED = 2,
  CANCELED = 3,
  COMPLETED = 4,
}

export enum AppointmentType {
  EXAM_CAPTURE = 1,
  REPORT_REVIEW = 2,
}

export interface Appointment {
  id: number;
  employee: Employee | null;
  patient: Patient | null;
  dateHour: string;
  appointmentStatus: AppointmentStatus;
  appointmentType: AppointmentType;
  status: string;
}
