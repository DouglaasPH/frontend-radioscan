import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';
import { PatientApi } from '../../core/api/patient/patient.api';
import { UserApi } from '../../core/api/user/user.api';
import { RegistrationState } from '../../core/states/registration.state';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './terms-and-conditions.html',
})
export class TermsAndConditions {
  private router = inject(Router);
  private patientApi = inject(PatientApi);
  private userApi = inject(UserApi);
  private registrationState = inject(RegistrationState);

  termsForm = new FormGroup({
    acceptedTerms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  goToTerms(): void {
    if (this.termsForm.invalid) {
      return;
    }

    const pendingData = this.registrationState.registrationData();

    if (!pendingData) {
      this.router.navigate([ROUTES.CREATE_ACCOUNT]);
      return;
    }

    this.patientApi.register(pendingData).subscribe({
      next: (response) => {
        this.registrationState.clear();
        console.log(response);
        this.userApi.me().subscribe({
          next: (response) => {
            this.router.navigate([ROUTES.DASHBOARD_PATIENT]);
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }

  cancel(): void {
    this.registrationState.clear();
    this.router.navigate([ROUTES.CREATE_ACCOUNT]);
  }
}
