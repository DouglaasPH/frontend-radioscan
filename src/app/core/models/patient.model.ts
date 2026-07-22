import { User } from './user.model';

export interface Patient {
  id: number;
  cpf: string;
  phone: string;
  user: User;
}
