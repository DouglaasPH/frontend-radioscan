import { User } from './user.model';

export interface Employee {
  id: number;
  licenseNumber: string;
  position: string;
  user: User;
}
