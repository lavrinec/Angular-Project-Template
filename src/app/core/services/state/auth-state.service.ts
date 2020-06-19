import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { environment } from '@src/environments/environment';
import {
  getString,
  setString,
  remove
} from 'tns-core-modules/application-settings';
import { Router } from '@angular/router';

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

  initialRedirectUrl: string;
  initialQueryParams: object;

  constructor(private cookieService: CookieService, private router: Router) { }

  getAuthObject(): AuthModel {
    const auth: AuthModel = {
      insightToken: this.getInsightToken(),
      MSALToken: null,
    };
    return auth;
  }

  setInsightToken(token: string, expirationDate: Date) {
    this.insightToken = token;
    this.setCookie('token', token, expirationDate);
  }

  getInsightToken() {
    const token = this.getCookie('token');
    if (token) {
      return token;
    } else {
      // TODO refresh token
    }
  }

  logout() {
    this.deleteCookie('token');
    void this.router.navigate(['login']);
  }

  public getIsLoggedIn(): boolean {
    const authObj = this.getAuthObject();
    return !!(authObj.insightToken || authObj.MSALToken);
  }

  private setCookie(name: string, value: string, expirationDate?: Date) {
    if (!environment.nativeScript) {
      this.cookieService.set(name, value, expirationDate);
    } else {
      setString(name, value);
    }
  }

  private getCookie(name: string) {
    if (!environment.nativeScript) {
      return this.cookieService.get(name);
    } else {
      return getString(name);
    }
  }

  private deleteCookie(name: string) {
    if (!environment.nativeScript) {
      return this.cookieService.delete(name);
    } else {
      return remove(name);
    }
  }
}
