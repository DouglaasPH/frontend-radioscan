import { StorageService } from './storage.service';
import { STORAGE } from '../constants/storage.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor(private storageService: StorageService) {}

  set(token: string): void {
    this.storageService.set(STORAGE.REFRESH_TOKEN, token);
  }

  get() {
    return this.storageService.get<string>(STORAGE.REFRESH_TOKEN);
  }

  clear(): void {
    this.storageService.remove(STORAGE.REFRESH_TOKEN);
  }

  hasRefreshToken(): boolean {
    return !!this.get();
  }
}
