import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenState {
  private accessToken = signal<string | null>(null);

  set(token: string): void {
    this.accessToken.set(token);
  }

  get() {
    return this.accessToken();
  }

  clear() {
    this.accessToken.set(null);
  }

  isAuthenticated() {
    return !!this.accessToken();
  }
}
