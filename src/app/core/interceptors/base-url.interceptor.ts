import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SettingsStateService} from '@src/app/core/services/state/settings-state.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(
    private settingsStateService: SettingsStateService,
            LSS: LocalStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add base url
    // this.settingsStateService.UpdateSettings();
    const connectionSettings = this.settingsStateService.settings.connection;
    const baseServerUrl = connectionSettings.protocol + '://' + connectionSettings.serverLocation;
    const apiReq = req.clone({ url: `${baseServerUrl}${req.url}` });

    return next.handle(apiReq);
  }
}
