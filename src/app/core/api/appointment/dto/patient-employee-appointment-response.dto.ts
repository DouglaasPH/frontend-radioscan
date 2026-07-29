export interface PatientEmployeeAppointmentResponseDto {
  id: number;
  appointmentStatus: number;
  appointmentType: number;
  employeeName: string;
  dateHour: string;
  xRayReportId: number | null;
  isReleasedToPatientXRayReport: boolean;
}
