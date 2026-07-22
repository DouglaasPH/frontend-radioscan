import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private user = signal<User | null>(null);

  set(user: User): void {
    this.user.set(user);
  }

  get() {
    return this.user();
  }

  clear() {
    this.user.set(null);
  }

  isAuthenticated() {
    return !!this.user();
  }

  getRoleOrEmployeePosition() {
    if (this.user()?.role === 'EMPLOYEE') {
      return this.user()?.employee?.position;
    }
    return this.user()?.role;
  }
}
