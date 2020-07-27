import { Injectable } from '@angular/core';
import {getString, remove, setString} from "tns-core-modules/application-settings";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  public setCookie(name: string, value: string, expirationDate?: Date) {
    setString(name, value);
  }


  public getCookie(name: string) {
    return getString(name);
  }

  public deleteCookie(name: string) {
     return remove(name);
  }


}
