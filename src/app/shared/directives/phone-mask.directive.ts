import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  private ngControl = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    let digits = input.value.replace(/\D/g, '');

    if (!digits) {
      this.updateValue(input, '');
      return;
    }

    let ddd = '';
    let numberPart = '';

    if (digits.length <= 2) {
      ddd = digits;
    } else {
      ddd = digits.substring(0, 2);

      let rest = digits.substring(2);

      if (rest.startsWith('9')) {
        rest = rest.substring(1);
      }

      numberPart = rest.substring(0, 8);
    }

    let formatted = '';

    if (digits.length <= 2) {
      formatted = `(${ddd}`;
    } else {
      const part1 = numberPart.substring(0, 4);
      const part2 = numberPart.substring(4, 8);

      if (numberPart.length > 4) {
        formatted = `(${ddd}) 9${part1}-${part2}`;
      } else {
        formatted = `(${ddd}) 9${part1}`;
      }
    }

    this.updateValue(input, formatted);
  }

  private updateValue(input: HTMLInputElement, value: string): void {
    input.value = value;
    if (this.ngControl) {
      this.ngControl.control?.setValue(value, { emitEvent: false });
    }
  }
}
