import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisibilitySidebarState {
  readonly isVisible = signal(false);

  toggle() {
    this.isVisible.update((value) => !value);
  }
}
