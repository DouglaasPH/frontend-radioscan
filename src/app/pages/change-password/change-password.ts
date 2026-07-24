import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserPasswordRequest } from '../../core/api/user/dto/update-user-password-request.dto';
import { UserApi } from '../../core/api/user/user.api';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
})
export class ChangePassword {
  private router = inject(Router);
  private readonly userApi = inject(UserApi);

  protected showCurrentPassword = signal(false);
  protected showNewPassword = signal(false);

  passwordsForm = new FormGroup({
    currentPassword: new FormControl('', { nonNullable: true }),
    newPassword: new FormControl('', { nonNullable: true }),
  });

  toggleCurrentPassword(): void {
    this.showCurrentPassword.set(!this.showCurrentPassword());
  }

  toggleNewPassword(): void {
    this.showNewPassword.set(!this.showNewPassword());
  }

  changePassword() {
    if (this.passwordsForm.invalid) {
      this.passwordsForm.markAllAsTouched();
      return;
    }
    const formValues = this.passwordsForm.getRawValue();

    const dto: UpdateUserPasswordRequest = {
      currentPassword: formValues.currentPassword,
      newPassword: formValues.newPassword,
    };

    this.userApi.updatePassword(dto).subscribe({
      next: (response) => {
        this.router.navigate([ROUTES.PROFILE]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
