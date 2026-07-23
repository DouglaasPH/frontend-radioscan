import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeApi } from '../../core/api/employee/employee.api';
import { RegisterEmployeeRequest } from '../../core/api/employee/dto/register-employee-request.dto';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-create-account-employee',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-account-employee.html',
  styleUrl: './create-account-employee.css',
})
export class CreateAccountEmployee {
  private readonly router = inject(Router);
  private readonly employeeApi = inject(EmployeeApi);

  protected showPassword = signal(false);
  protected showConfirmPassword = signal(false);

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  registerForm = new FormGroup({
    first_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    second_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    licenseNumber: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    position: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  goToDashboard(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValues = this.registerForm.getRawValue();

    if (
      formValues.password == '' ||
      formValues.confirmPassword == '' ||
      formValues.password !== formValues.confirmPassword
    ) {
      return;
    }

    const dto: RegisterEmployeeRequest = {
      user: {
        name: `${formValues.first_name} ${formValues.second_name}`,
        email: formValues.email,
        password: formValues.password,
      },
      employee: {
        licenseNumber: formValues.licenseNumber,
        position:
          formValues.position === 'doctor'
            ? 'DOCTOR'
            : formValues.position === 'TECHNICAL'
              ? 'TECHNICAL'
              : 'TECHNICAL',
      },
    };

    this.employeeApi.register(dto).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([ROUTES.EMPLOYEE_MANAGEMENT]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
