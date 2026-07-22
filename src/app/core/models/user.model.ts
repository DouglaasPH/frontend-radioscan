import { Role } from '../constants/roles.constants';
import { Employee } from './employee.model';
import { Patient } from './patient.model';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  employee: Employee | null;
  patient: Patient | null;
}
