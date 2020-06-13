import { Component, OnInit } from '@angular/core';
import {AuthService} from '@src/app/core/services/api/auth.service';
import {Router} from '@angular/router';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = 'sebastjanm';
  password = 'Manto1234!';
  authInProgress = false;
  authMessage = [];

  constructor(
      private authService: AuthService,
      private authStateService: AuthStateService,
      private router: Router,
      private routerExtensions: RouterExtensions
  ) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    console.log('login metoda');
    console.log('username:' + username , 'password:' + password);

    this.authInProgress = true;
    this.authService.login(username, password).subscribe(response => {
      console.log('1111');
      this.redirectAfterLoginSuccess();
    }, error => {
      // login failed
      console.log(111111, error);
      alert('prijava nesupešna');
    }, () => {
      this.authInProgress = false;
    });
  }

  redirectAfterLoginSuccess() {
    console.log('uspešen login');
    const redirectTo = this.authStateService.initialRedirectUrl;
    const queryParams = this.authStateService.initialQueryParams;
    console.log(redirectTo);
    if (redirectTo) {
      this.router.navigate([redirectTo], { queryParams: queryParams}).then(() => {
        // this.redirectUrl = null;
      });
    } else {
      this.router.navigate(['home']);

    }
  }
  logout() {
    this.routerExtensions.navigate(['/home'], { clearHistory: true });
  }
  register() {
    console.log('kliklnilo me je');
    alert('uporabnik je uspešno registriran.');
  }

}
