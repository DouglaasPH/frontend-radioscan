import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisibilitySidebarState {
  readonly isVisible = signal(true);

  toggle() {
    this.isVisible.update((value) => !value);
  }
}
