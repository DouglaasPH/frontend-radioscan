import { Component, effect, inject, signal } from '@angular/core';
import { UserState } from '../../core/states/user.state';
import { PhoneMaskDirective } from '../../shared/directives/phone-mask.directive';
import { CpfMaskDirective } from '../../shared/directives/cpf-mask.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserDataRequest } from '../../core/api/user/dto/update-user-data-request.dto';
import { UserApi } from '../../core/api/user/user.api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CpfMaskDirective, PhoneMaskDirective, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
})
export class Profile {
  private readonly userApi = inject(UserApi);
  protected readonly userState = inject(UserState);

  protected readonly isEditing = signal(false);

  dataForm = new FormGroup({
    cpf: new FormControl(
      {
        value: this.userState.get()?.patient?.cpf ?? '',
        disabled: true,
      },
      { nonNullable: true },
    ),
    phone: new FormControl(
      {
        value: this.userState.get()?.patient?.phone ?? '',
        disabled: true,
      },
      { nonNullable: true },
    ),
  });

  constructor() {
    effect(() => {
      if (this.isEditing()) {
        this.dataForm.enable();
      } else {
        this.dataForm.disable();
      }
    });
  }

  protected saveChanges() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return;
    }
    if (
      this.dataForm.get('cpf')!.value === this.userState.get()?.patient?.cpf &&
      this.dataForm.get('phone')!.value === this.userState.get()?.patient?.phone
    ) {
      return;
    }

    const formValues = this.dataForm.getRawValue();

    const dto: UpdateUserDataRequest = {
      cpf: formValues.cpf,
      phone: formValues.phone,
    };

    this.userApi.updateData(dto).subscribe({
      next: (response) => {
        console.log(response);
        this.isEditing.set(false);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
