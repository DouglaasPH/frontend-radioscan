export interface AppointmentsManagementAdminResponseDto {
  id: number;
  dateHour: string;
  appointmentStatus: number;
  appointmentType: number;
  employeeName: string | null;
  patientName: string | null;
}
