import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ExamUploadMainComponent } from './components/exam-upload-main-component/exam-upload-main.component';
import { ExamSuccessfullySubmittedComponent } from './components/exam-successfully-submitted/exam-succesfully-submitted.component';

@Component({
  selector: 'app-exam-upload',
  imports: [
    SidebarComponent,
    NavbarComponent,
    ExamUploadMainComponent,
    ExamSuccessfullySubmittedComponent,
  ],
  templateUrl: './exam-upload.html',
})
export class ExamUpload {}
