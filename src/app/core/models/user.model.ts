import { Employee } from './employee.model';
import { Patient } from './patient.model';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  employee: Employee | null;
  patient: Patient | null;
}
