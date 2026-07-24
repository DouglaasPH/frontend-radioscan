import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../enviroments/environment.development';
import { User } from '../../models/user.model';
import { UserState } from '../../states/user.state';
import { UpdateUserDataRequest } from './dto/update-user-data-request.dto';
import { UpdateUserPasswordRequest } from './dto/update-user-password-request.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);

  private userState = inject(UserState);

  me() {
    return this.http.get<User>(`${environment.apiUrl}/user/me`).pipe(
      tap((response) => {
        this.userState.set(response);
      }),
    );
  }

  updateData(dto: UpdateUserDataRequest) {
    return this.http.put<User>(`${environment.apiUrl}/user/data`, dto).pipe(
      tap((response) => {
        console.log('user/data', response);
        this.userState.set(response);
      }),
    );
  }

  updatePassword(dto: UpdateUserPasswordRequest) {
    return this.http.put<User>(`${environment.apiUrl}/user/password`, dto).pipe(
      tap((response) => {
        console.log('user/password', response);
        this.userState.set(response);
      }),
    );
  }
}
