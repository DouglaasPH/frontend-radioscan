import { Injectable, signal } from '@angular/core';
import { RegisterPatientRequest } from '../dto/patient/register-patient-request.dto';

@Injectable({
  providedIn: 'root',
})
export class RegistrationState {
  private registrationDataSignal = signal<RegisterPatientRequest | null>(null);

  readonly registrationData = this.registrationDataSignal.asReadonly();

  set(data: RegisterPatientRequest): void {
    this.registrationDataSignal.set(data);
  }

  clear(): void {
    this.registrationDataSignal.set(null);
  }
}
