import { Component, effect, inject, signal, untracked } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminApi } from '../../core/api/admin/admin.api';
import { User } from '../../core/models/user.model';
import { NgClass } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { AppointmentApi } from '../../core/api/appointment/appointment.api';
import { CreateAppointmentRequestDto } from '../../core/api/appointment/dto/create-appointment-request.dto';
import { ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-new-consultation-appointment-slot',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, FormsModule, A11yModule],
  templateUrl: './new-consultation-appointment-slot.html',
})
export class NewConsultationAppointmentSlot {
  createAppointmentForm = new FormGroup({
    type: new FormControl('EXAM_CAPTURE', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hour: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly Math = Math;
  private readonly adminApi = inject(AdminApi);
  private readonly appointmentApi = inject(AppointmentApi);
  private readonly router = inject(Router);

  protected readonly employees = signal<User[]>([]); // Array para armazenar os funcionários

  protected readonly currentPage = signal(0); // Página atual
  protected readonly totalPages = signal(0); // Total de páginas disponíveis
  protected readonly totalEmployees = signal(0); // Total de usuários encontrados
  protected readonly numberOfElements = signal(0); // Número de elementos na página atual

  protected readonly selectedEmployeeId = signal<null | number>(null); // '' ou 'DOCTOR' ou 'TECHNICAL' para filtrar os funcionários por posição
  protected readonly searchName = signal(''); // Nome do funcionário para busca

  protected readonly minDate!: string;

  constructor() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Formata para YYYY-MM-DD (padrão exigido pelo input date)
    this.minDate = tomorrow.toISOString().split('T')[0];
    effect(() => {
      untracked(() => {
        this.currentPage.set(0);
        this.loadEmployees();
      });
    });
  }

  loadEmployees() {
    const position =
      this.createAppointmentForm.value.type === 'EXAM_CAPTURE' ? 'TECHNICAL' : 'DOCTOR';
    this.adminApi
      .employeesManagementWithPagination(this.searchName(), position, this.currentPage())
      .subscribe({
        next: (response) => {
          this.employees.set(response.content);
          this.totalEmployees.set(response.totalElements);
          this.totalPages.set(response.totalPages);
          this.numberOfElements.set(response.numberOfElements);
        },
      });
  }

  searchEmployees() {
    if (!this.searchName().trim()) {
      return;
    }
    this.loadEmployees();
  }

  changePage(pageNumber: number) {
    if (pageNumber < 0 || pageNumber >= this.totalPages()) {
      return;
    }

    this.currentPage.set(pageNumber);
    this.loadEmployees();
  }

  protected paginationPages() {
    const total = this.totalPages();
    const current = this.currentPage();

    let start = Math.max(0, current - 1);

    let end = Math.min(start + 3, total);

    if (end - start < 3) {
      start = Math.max(0, end - 3);
    }

    return Array.from({ length: end - start }, (_, index) => start + index);
  }

  protected onSearchNameChange(value: string) {
    this.searchName.set(value);

    if (value.trim().length === 0) {
      this.resetPage();
      this.loadEmployees();
    }
  }

  private resetPage() {
    this.currentPage.set(0);
  }

  create() {
    if (this.createAppointmentForm.invalid || this.selectedEmployeeId() === null) {
      return;
    }
    const dto: CreateAppointmentRequestDto = {
      employee_id: this.selectedEmployeeId()!,
      dateHour: `${this.createAppointmentForm.value.date}T${this.createAppointmentForm.value.hour}`,
      type: this.createAppointmentForm.value.type!,
    };

    this.appointmentApi.create(dto).subscribe({
      next: () => {
        this.router.navigate([ROUTES.APPOINTMENT_MANAGEMENT]);
      },
    });
  }

  clickedEmployee(employee: User) {
    this.selectedEmployeeId.set(employee.employee!.id);
  }
}
