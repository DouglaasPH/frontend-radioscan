import { CreateUserRequest } from '../../user/dto/create-user-request.dto';

export interface RegisterPatientRequest {
  user: CreateUserRequest;
  patient: {
    cpf: string;
    phone: string;
  };
}
