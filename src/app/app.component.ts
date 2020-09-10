import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { environment } from '@src/environments/environment';
import { AuthStateService } from '@src/app/core/services/state/auth-state.service';
import { AuthService } from '@src/app/core/services/api/auth.service';
import { UserData } from '@src/app/components/Classes/UserData';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _activatedUrl: string;
  private location: string;
  locationArray = [];
  userData: UserData;


  constructor(
      private helper: HelperService,
      public router: Router,
      private authStateService: AuthStateService,
      private authService: AuthService,
      private LSS: LocalStorageService
  ) {
    this.userData = this.authStateService.userData.value;
    this.authStateService.userData.subscribe(userData => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {
    this._activatedUrl = '/home';
    this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
  }

  onNavItemTap(navItemRoute: string) {
    this.helper.onNavItemTap(navItemRoute);
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onSideBarToggle(event) {
    this.helper.onDrawerButtonTap();
  }

  logout(): void {
    this.authStateService.logout();
    this.helper.closeDrawer();
  }

  setUserData() {
    // check if user logged in and fill userData.
    this.authService.getUserData().subscribe((userData) => {
      this.LSS.store('userData', userData);
      this.authStateService.userData.next(userData);
    });
  }

  kliknime() {
    console.log(this.localStorageService.GetAll());
  }

}
