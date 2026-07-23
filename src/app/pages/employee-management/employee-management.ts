import { Component, effect, inject, signal, untracked } from '@angular/core';
import { AdminApi } from '../../core/api/admin/admin.api';
import { RouterLink } from '@angular/router';
import { User } from '../../core/models/user.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-management',
  imports: [RouterLink, NgClass, FormsModule],
  templateUrl: './employee-management.html',
})
export class EmployeeManagement {
  protected readonly Math = Math;
  private readonly adminApi = inject(AdminApi);
  protected readonly metrics = signal({
    total: 0,
    doctors: 0,
    technicians: 0,
  });
  protected readonly selectedPosition = signal(''); // '' ou 'DOCTOR' ou 'TECHNICAL' para filtrar os funcionários por posição
  protected readonly searchName = signal(''); // Nome do funcionário para busca

  protected readonly employees = signal<User[]>([]); // Array para armazenar os funcionários

  protected readonly currentPage = signal(2); // Página atual
  protected readonly totalPages = signal(0); // Total de páginas disponíveis
  protected readonly totalEmployees = signal(0); // Total de usuários encontrados
  protected readonly numberOfElements = signal(0); // Número de elementos na página atual

  constructor() {
    this.loadMetrics();

    effect(() => {
      this.selectedPosition();

      untracked(() => {
        this.currentPage.set(0);
        this.loadEmployees();
      });
    });
  }

  private loadMetrics() {
    this.adminApi.employeesManagementMetrics().subscribe({
      next: (response) => {
        this.metrics.set({
          total: response.numberOfEmployees,
          doctors: response.numberOfDoctors,
          technicians: response.numberOfTechnicians,
        });
      },
    });
  }

  loadEmployees() {
    this.adminApi
      .employeesManagementWithPagination(
        this.searchName(),
        this.selectedPosition(),
        this.currentPage(),
      )
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
}
