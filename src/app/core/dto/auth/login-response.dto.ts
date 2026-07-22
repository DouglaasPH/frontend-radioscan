import { User } from '../../models/user.model';

export interface LoginResponse {
  registered: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}
