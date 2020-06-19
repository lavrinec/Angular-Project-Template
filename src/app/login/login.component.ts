import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from '@src/app/core/services/api/auth.service';
import {Router} from '@angular/router';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username = 'sebastjanm';
  password = 'Manto1234!';
  authInProgress = false;
  authMessage = [];
  private unsubscribe$ = new Subject();

  constructor(
      private authService: AuthService,
      private authStateService: AuthStateService,
      private router: Router,
      private routerExtensions: RouterExtensions,
      private page: Page
  ) { }

  ngOnInit() {
    if (environment.nativeScript) {
      this.page.actionBarHidden = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
  }

  login(username: string, password: string) {
    console.log('login metoda');
    console.log('username:' + username , 'password:' + password);

    this.authInProgress = true;
    this.authService.login(username, password)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.authInProgress = false; }))
      .subscribe(response => {
        this.redirectAfterLoginSuccess();
      }, error => {
        // login failed
        alert('prijava nesupešna');
      });
  }

  redirectAfterLoginSuccess() {
    console.log('uspešen login');
    const redirectTo = this.authStateService.initialRedirectUrl;
    const queryParams = this.authStateService.initialQueryParams;
    if (redirectTo) {
      this.router.navigate([redirectTo], { replaceUrl: true, queryParams: queryParams}).then(() => {
        // this.redirectUrl = null;
      });
    } else {
      void this.router.navigate(['home'], { replaceUrl: true });

    }
  }

  register() {
    console.log('kliklnilo me je');
    alert('uporabnik je uspešno registriran.');
  }

}
