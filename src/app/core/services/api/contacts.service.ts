import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '@src/app/contatcs/Contact';

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

  search(searchString): Observable<Contact[]> {
    let queryParams = '?';
    if (searchString) { queryParams += 'words=' + searchString; }
    return this.httpClient.get<Contact[]>('/api/person/contact/search' + queryParams + '&top=200');
  }

  getContact(contactId: number): Observable<Contact> {
    return this.httpClient.get<Contact>('/api/person/contact/' + contactId);
  }

  createContact(contact: object) {
    return this.httpClient.post('/api/person/contact', contact);
  }

  deleteContact(contactId: number) {
    return this.httpClient.delete('/api/person/contact/' + contactId);
  }

  patchContacts(patchArray: object[]) { // [..., {id: number, attrs...: any},...]
    return this.httpClient.patch('/api/person/contact', patchArray);
  }
}
