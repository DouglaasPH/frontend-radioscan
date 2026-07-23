import { CreateUserRequest } from '../../user/dto/create-user-request.dto';

export interface RegisterEmployeeRequest {
  user: CreateUserRequest;
  employee: {
    licenseNumber: string;
    position: string;
  };
}
