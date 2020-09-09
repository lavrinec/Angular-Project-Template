import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

import { Router } from '@angular/router';
import {TokenService} from "@src/app/shared/services/token.service";
import {UserData} from "@src/app/components/Classes/UserData";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "@src/app/shared/services/local-storage.service";

class AuthModel {
  insightToken: string;
  MSALToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private insightToken: string;
  private MSALToken: string;
  userData: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(
      <UserData>this.LSS.retrieve('userData')
  );

  initialRedirectUrl: string;
  initialQueryParams: object;

  constructor(
      private tokenService: TokenService,
      private router: Router,
      private LSS: LocalStorageService
  ) {}

  getAuthObject(): AuthModel {
    const auth: AuthModel = {
      insightToken: this.getInsightToken(),
      MSALToken: null,
    };
    return auth;
  }

  setInsightToken(token: string, expirationDate: Date) {
    this.insightToken = token;
    this.tokenService.setCookie('token', token, expirationDate);
  }

  getInsightToken() {
    const token = this.tokenService.getCookie('token');
    console.log('getInsightToken', token);
    if (token) {
      return token;
    } else {
      // TODO refresh token
    }
  }

  logout() {
    this.tokenService.deleteCookie('token');
    void this.router.navigate(['login']);
  }

  public getIsLoggedIn(): boolean {
    const authObj = this.getAuthObject();
    return !!(authObj.insightToken || authObj.MSALToken);
  }

}
