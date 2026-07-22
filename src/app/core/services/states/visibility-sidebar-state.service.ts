import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisibilitySidebarService {
  readonly isVisible = signal(true);

  toggle() {
    this.isVisible.update((value) => !value);
  }
}
