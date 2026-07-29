import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { RequestDownloadResponseDto } from './dto/request-download-response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class XRayReportApi {
  private http = inject(HttpClient);

  getDownloadUrl(reportId: number): Observable<RequestDownloadResponseDto> {
    return this.http.get<RequestDownloadResponseDto>(
      `${environment.apiUrl}/x-ray/${reportId}/download`,
    );
  }

  downloadFileFromUrl(url: string, fileName: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (err) => console.error('Erro ao fazer download da imagem do S3:', err),
    });
  }
}
