import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingState {
  private requests = signal(0);

  readonly isLoading = computed(() => this.requests() > 0);

  start(): void {
    this.requests.update((value) => value + 1);
  }

  stop(): void {
    this.requests.update((value) => Math.max(value - 1, 0));
  }

  reset(): void {
    this.requests.set(0);
  }
}
