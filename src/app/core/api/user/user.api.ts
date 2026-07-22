import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../enviroments/environment.development';
import { User } from '../../models/user.model';
import { UserState } from '../../states/user.state';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private http = inject(HttpClient);

  private userState = inject(UserState);

  me() {
    return this.http.get<User>(`${environment.apiUrl}/user/me`).pipe(
      tap((response) => {
        console.log(response);
        this.userState.set(response);
      }),
    );
  }
}
