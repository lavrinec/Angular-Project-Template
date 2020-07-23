import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { environment } from '@src/environments/environment';
import { Router } from '@angular/router';
import { HelperService } from '@src/app/core/services/utils/helper.service';

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

  constructor(private helper: HelperService, private cookieService: CookieService, private router: Router) { }

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
    console.log('getInsightToken', token);
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
    console.log('setCookie', environment.nativeScript);
    if (!environment.nativeScript) {
      this.cookieService.set(name, value, expirationDate);
    } else {
       this.helper.setStringSettings(name, value);
       console.log(name);
       console.log(value);
    }
  }

  private getCookie(name: string) {
    if (!environment.nativeScript) {
      return this.cookieService.get(name);
    } else {
      // TODO fix quick as possible
      console.log('getcookie retunr',this.helper.getStringSettings(name));
      return this.helper.getStringSettings(name);
      // return 'abc';
    }
  }

  private deleteCookie(name: string) {
    if (!environment.nativeScript) {
      return this.cookieService.delete(name);
    } else {
      return this.helper.removeSettings(name);
    }
  }
}
