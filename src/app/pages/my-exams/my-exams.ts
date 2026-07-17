import { Component } from '@angular/core';
import { NavbarComponent } from '../dashboard/components/navbar/navbar.component';
import { SidebarComponent } from '../dashboard/components/sidebar/sidebar.component';

@Component({
  selector: 'app-my-exams',
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './my-exams.html',
})
export class MyExams {}
