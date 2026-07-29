import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AppointmentApi } from '../../../../core/api/appointment/appointment.api';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'component-exam-upload-main',
  imports: [NgClass],
  templateUrl: './exam-upload-main.component.html',
})
export class ExamUploadMainComponent implements OnInit {
  private readonly appointmentApi = inject(AppointmentApi);
  private http = inject(HttpClient);

  @Input() appointmentId!: string;
  @Output() uploadSuccess = new EventEmitter<void>();

  selectedFile: File | null = null;
  isDragging = false;

  ngOnInit() {
    console.log('ID do agendamento:', this.appointmentId);
  }

  // Seleção via clique no botão/input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Eventos para tratar Arrastar e Soltar (Drag & Drop)
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  uploadExam(): void {
    if (!this.selectedFile) return;

    this.appointmentApi.requestUpload(Number(this.appointmentId)).subscribe({
      next: (res) => this.uploadToS3(res.urlPreassignedS3, this.selectedFile!),
      error: (err) => console.error('Erro ao gerar URL', err),
    });
  }

  private uploadToS3(presignedUrl: string, file: File): void {
    this.http
      .put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
      })
      .subscribe({
        next: () => {
          console.log('Upload realizado com sucesso!');
          this.uploadSuccess.emit();
        },
        error: (err) => console.error('Erro no upload para o S3', err),
      });
  }
}
