import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';
import { PatientService } from '../../core/api/patient.api';
import { UserService } from '../../core/api/user.api';
import { RegistrationState } from '../../core/states/registration.state';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './terms-and-conditions.html',
})
export class TermsAndConditions {
  private router = inject(Router);
  private patientService = inject(PatientService);
  private userService = inject(UserService);
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

    this.patientService.register(pendingData).subscribe({
      next: (response) => {
        this.registrationState.clear();
        console.log(response);
        this.userService.me().subscribe({
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
