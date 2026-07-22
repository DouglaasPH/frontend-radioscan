import { Component, inject } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingState } from '../../../core/states/loading.state';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet, LoadingComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  protected loadingState = inject(LoadingState);
}
