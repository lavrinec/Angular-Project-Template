import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private httpClient: HttpClient,
      private authStateService: AuthStateService
  ) { }

  login(username: string, password: string) {
      console.log('sem v login metodi');
    const queryParams = '?username=' + username + '&password=' + password;
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.post('/connect/token' + queryParams, null, { headers: headers});
  }
}
