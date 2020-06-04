import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(private cookieService: CookieService) { }

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

  private setCookie(name: string, value: string, expirationDate: Date) {
    this.cookieService.set(name, value, expirationDate);
  }

  private getCookie(name: string) {
    return this.cookieService.get(name);
  }
}
