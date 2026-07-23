import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPatientRequest } from '../../core/api/patient/dto/register-patient-request.dto';
import { CpfMaskDirective } from '../../shared/directives/cpf-mask.directive';
import { PhoneMaskDirective } from '../../shared/directives/phone-mask.directive';
import { ROUTES } from '../../core/constants/routes.constants';
import { RegistrationState } from '../../core/states/registration.state';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, CpfMaskDirective, PhoneMaskDirective],
  templateUrl: './create-account-patient.html',
})
export class CreateAccountPatient {
  private router = inject(Router);
  private registrationState = inject(RegistrationState);

  protected showPassword = signal(false);
  protected showConfirmPassword = signal(false);

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  registerForm = new FormGroup({
    first_name: new FormControl('', { nonNullable: true }),
    second_name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    confirmPassword: new FormControl('', { nonNullable: true }),
    cpf: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }), // default value
  });

  goToTerms(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValues = this.registerForm.getRawValue();

    const dto: RegisterPatientRequest = {
      user: {
        name: `${formValues.first_name} ${formValues.second_name}`,
        email: formValues.email,
        password: formValues.password,
      },
      patient: {
        cpf: formValues.cpf,
        phone: formValues.phone,
      },
    };

    this.registrationState.set(dto);

    this.router.navigate([ROUTES.TERMS_AND_CONDITIONS]);
  }
}
