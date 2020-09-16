import { Injectable } from '@angular/core';
import { UserData } from '@src/app/components/Classes/UserData';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  static dateRegexISO8061 = new RegExp('/(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d)/');


  constructor() { }

  onNavItemTap(navItemRoute: string) {

  }

  onDrawerButtonTap() {
    const sideBarElement: HTMLElement = document.getElementById('sidebar');
    if (sideBarElement) {
      if (sideBarElement.classList.contains('active')) {
        sideBarElement.classList.remove('active');
      } else {
        sideBarElement.classList.add('active');
      }
    }

    const overlayElement: HTMLElement = <HTMLElement>document.getElementsByClassName('overlay')[0];
    if (overlayElement) {
      if (overlayElement.classList.contains('active')) {
        overlayElement.classList.remove('active');
      } else {
        overlayElement.classList.add('active');
      }
    }
  }

  searchBarText(args) {
    return '';
  }

  goBack(): void {
  }
  closeDrawer(): void {

  }
  userData(): UserData { return new UserData(); }

  getUserActivity( userid) {

  }

  openEmail(email) { }

  openPhone(phone) {

  }

  openUrl(value: string) {}

  parseDatesJSON(key: string, value) {
    if (typeof value === 'string') {
      const a = HelperService.dateRegexISO8061.test(value);
      if (a) {
        return new Date(new Date(value).toISOString().slice(0, -1));
      }
    }
    return value;
  }
}
