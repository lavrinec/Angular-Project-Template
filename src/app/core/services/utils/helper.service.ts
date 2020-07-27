import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  onNavItemTap(navItemRoute: string) {

  }

  onDrawerButtonTap() {
    const sideBarElement: HTMLElement = document.getElementById('sidebar');
    if (sideBarElement.classList.contains('active')) {
      sideBarElement.classList.remove('active');
    } else {
      sideBarElement.classList.add('active');
    }

    const overlayElement: HTMLElement = <HTMLElement>document.getElementsByClassName('overlay')[0];
    if (overlayElement.classList.contains('active')) {
      overlayElement.classList.remove('active');
    } else {
      overlayElement.classList.add('active');
    }
  }
}
