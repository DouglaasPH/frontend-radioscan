export enum ProcessingStatus {
  AWAITING_AI = 1,
  PROCESSED_BY_IA = 2,
  AWAITING_VALIDATION_BY_DOCTOR = 3,
  VALIDATED_BY_DOCTOR = 4,
}

export interface XRayReport {
  id: number;
  createdAt: string;
  aiResult: string;
  finalMedicalDiagnosis: string | null;
  processingStatus: ProcessingStatus;
  releasedToPatient: boolean;
  s3Key: string;
}
