import { Injectable } from '@angular/core';
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import { UserData } from '@src/app/components/Classes/UserData';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

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
}
