import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
      private cookieService: CookieService,
  ) { }

  public setCookie(name: string, value: string, expirationDate?: Date) {
      this.cookieService.set(name, value, expirationDate);
  }

  public getCookie(name: string) {
    return this.cookieService.get(name);
  }

  public deleteCookie(name: string) {
    return this.cookieService.delete(name);
  }
}
