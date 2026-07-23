import { Component, inject, signal } from '@angular/core';
import { AdminApi } from '../../core/api/admin/admin.api';
import { UserState } from '../../core/states/user.state';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin {
  protected name = '';
  private readonly userState = inject(UserState);
  private readonly adminApi = inject(AdminApi);
  protected readonly data = signal({
    numberOfExamsPerformed: 0,
    availableAppointmentSlots: 0,
    totalNumberOfPatients: 0,
  });

  constructor() {
    this.name = this.userState.get()!.name;

    this.adminApi.dashboardMetrics().subscribe({
      next: (response) => {
        this.data.set({
          numberOfExamsPerformed: response.numberOfExamsPerformed,
          availableAppointmentSlots: response.availableAppointmentSlots,
          totalNumberOfPatients: response.totalNumberOfPatients,
        });
      },
    });
  }
}
