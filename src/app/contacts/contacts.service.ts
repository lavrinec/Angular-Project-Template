import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
      private httpClient: HttpClient
  ) { }

  testCall() {
    return this.httpClient.get('/api/contacts');
  }
}
