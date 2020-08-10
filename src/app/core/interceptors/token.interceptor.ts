import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { TokenService } from '@src/app/shared/services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // setup authorization header
    const token = this.tokenService.getCookie('token');
    const MSALToken = this.tokenService.getCookie('MSAL_token');
    if (token) {
      req = req.clone({
        headers: req.headers.append('authorization', 'Bearer ' + token)
      });
    } else if (MSALToken) {
      req = req.clone({
        headers: req.headers.append('authorization', 'Bearer ' + MSALToken)
      });
    }
    // return to next handle
    return next.handle(req);
  }
}
