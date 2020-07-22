import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { SettingsStateService } from '@src/app/core/services/state/settings-state.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private settingsStateService: SettingsStateService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // setup header
    req = req.clone({
      headers: req.headers.append('Timezone-Offset', (new Date).getTimezoneOffset().toString())
    });
    return next.handle(req);
  }
}
