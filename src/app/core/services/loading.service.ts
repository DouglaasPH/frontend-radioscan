import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  private canShowLoading = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.listenToRouteChanges();
  }

  private listenToRouteChanges(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      let route = this.activatedRoute.root;
      let showLoadingValue = true;

      while (route) {
        if (route.snapshot.data['showLoading'] !== undefined) {
          showLoadingValue = route.snapshot.data['showLoading'];
        }
        route = route.firstChild!;
      }

      this.canShowLoading = showLoadingValue;
    });
  }

  show(): void {
    if (this.canShowLoading) {
      this.isLoadingSubject.next(true);
    }
  }

  hide(): void {
    this.isLoadingSubject.next(false);
  }
}
