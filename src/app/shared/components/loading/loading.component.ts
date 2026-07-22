import { Component, inject } from '@angular/core';
import { LoadingState } from '../../../core/states/loading.state';

@Component({
  selector: 'component-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  loadingState = inject(LoadingState);
}

/* 
@if(loadingState.isLoading()){

    <loading-component />

}
*/
