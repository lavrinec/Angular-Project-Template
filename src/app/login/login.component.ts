import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '@src/app/core/services/state/auth-state.service';
import { AuthService } from '@src/app/core/services/api/auth.service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HelperService } from '@src/app/core/services/utils/helper.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  authInProgress = false;
  authMessage = [];
  private unsubscribe$ = new Subject();

  constructor(
    private authService: AuthService,
    private helper: HelperService,
    private authStateService: AuthStateService,
    private router: Router,
  ) { }

  ngOnInit() {

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
        console.log('after subscribe');
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
  logout() {
    console.log(this.helper.getAllKeysSettings());
    console.log('Token', this.helper.getStringSettings('token'));
  }

}
