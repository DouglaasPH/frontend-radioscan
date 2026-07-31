import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-action-cell',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <td
      class="py-4 flex gap-2 items-center transition-all"
      [ngClass]="[config().textColor, config().isLink ? 'cursor-pointer hover:opacity-80' : '']"
      [routerLink]="config().isLink ? config().route : null"
    >
      <span>{{ config().text }}</span>
      @if (config().showIcon) {
        <span class="material-symbols-outlined !text-[12px]">arrow_forward_ios</span>
      }
    </td>
  `,
})
export class AppointmentActionCellComponent {
  // Inputs usando Signal (Angular 17.1+)
  appointmentId = input.required<string | number>();
  status = input.required<number>(); // 1: Disponível, 2: Agendada, 3: Cancelada, 4: Concluída
  role = input.required<string>();

  // Regra de negócio computada baseada no Status e na Role
  config = computed(() => {
    const currentStatus = this.status();
    const currentRole = this.role();
    const id = this.appointmentId();

    // Lógica para TÉCNICO
    if (currentRole === 'TECHNICAL') {
      if (currentStatus === 2) {
        return {
          text: 'Fazer upload de exame.',
          textColor: 'text-green-600',
          route: `/dashboard/technical/exam-upload/${id}`,
          isLink: true,
          showIcon: true,
        };
      } else if (currentStatus === 1 || currentStatus === 3) {
        return {
          text: 'Não é possível fazer upload do exame.',
          textColor: 'text-red-600',
          route: null,
          isLink: false,
          showIcon: false,
        };
      } else {
        return {
          text: 'Exame já enviado.',
          textColor: 'text-[#055cb9]',
          route: null,
          isLink: false,
          showIcon: false,
        };
      }
    }

    // Lógica para MÉDICO (exemplo de adaptação para a 2ª função)
    if (currentRole === 'DOCTOR') {
      if (currentStatus === 2) {
        return {
          text: 'Revisar laudo.',
          textColor: 'text-green-600',
          route: `/dashboard/doctor/exam-view/${id}`,
          isLink: true,
          showIcon: true,
        };
      } else {
        return {
          text: 'Sem laudo disponível.',
          textColor: 'text-gray-400',
          route: null,
          isLink: false,
          showIcon: false,
        };
      }
    }

    // Fallback padrão
    return {
      text: 'Indisponível.',
      textColor: 'text-gray-400',
      route: null,
      isLink: false,
      showIcon: false,
    };
  });
}
