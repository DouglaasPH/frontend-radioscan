import { Component, Input, signal } from '@angular/core';
import { ExamUploadMainComponent } from './components/exam-upload-main-component/exam-upload-main.component';
import { ExamSuccessfullySubmittedComponent } from './components/exam-successfully-submitted/exam-succesfully-submitted.component';

@Component({
  selector: 'app-exam-upload',
  imports: [ExamUploadMainComponent, ExamSuccessfullySubmittedComponent],
  templateUrl: './exam-upload.html',
})
export class ExamUpload {
  @Input() appointmentId!: string;
  protected isExamSuccessfullySubmitted = signal(false);

  onUploadSuccess(): void {
    this.isExamSuccessfullySubmitted.set(true);
  }
}
