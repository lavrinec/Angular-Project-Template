import { Component, OnInit } from '@angular/core';
import {AuthService} from '@src/app/core/services/api/auth.service';
import {Router} from '@angular/router';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  authInProgress = false;
  authMessage = [];

  constructor(
      private authService: AuthService,
      private authStateService: AuthStateService,
      private router: Router,
  ) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.authInProgress = true;
    this.authService.login(username, password).subscribe(response => {
      this.redirectAfterLoginSuccess();
    }, error => {
      // login failed
    }, () => {
      this.authInProgress = false;
    });
  }

  redirectAfterLoginSuccess() {
    const redirectTo = this.authStateService.initialRedirectUrl;
    const queryParams = this.authStateService.initialQueryParams;
    if (redirectTo) {
      this.router.navigate([redirectTo], { queryParams: queryParams}).then(() => {
        // this.redirectUrl = null;
      });
    } else {
      this.router.navigate(['home']);
    }
  }
}
