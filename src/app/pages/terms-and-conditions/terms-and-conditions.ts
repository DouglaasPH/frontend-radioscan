import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CpfMaskDirective } from '../../shared/directives/cpf-mask.directive';
import { PhoneMaskDirective } from '../../shared/directives/phone-mask.directive';
import { ROUTES } from '../../core/constants/routes.constants';
import { RegistrationStateService } from '../../core/services/states/registration-state.service';
import { PatientService } from '../../core/services/patient.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [ReactiveFormsModule, CpfMaskDirective, PhoneMaskDirective],
  templateUrl: './terms-and-conditions.html',
})
export class TermsAndConditions {
  private router = inject(Router);
  private patientService = inject(PatientService);
  private userService = inject(UserService);
  private registrationStateService = inject(RegistrationStateService);

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

    const pendingData = this.registrationStateService.registrationData();

    if (!pendingData) {
      this.router.navigate([ROUTES.CREATE_ACCOUNT]);
      return;
    }

    this.patientService.register(pendingData).subscribe({
      next: (response) => {
        this.registrationStateService.clear();
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
    this.registrationStateService.clear();
    this.router.navigate([ROUTES.CREATE_ACCOUNT]);
  }
}
