import { Injectable } from '@angular/core';
import { getString, remove, setString } from 'tns-core-modules/application-settings';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  onNavItemTap(navItemRoute: string) {

  }

  onDrawerButtonTap() {
    // <script type="text/javascript">
    //     $(document).ready(function () {
    //       $("#sidebar").mCustomScrollbar({
    //         theme: "minimal"
    //       });
    //
    //       $('#dismiss, .overlay').on('click', function () {
    //         // hide sidebar
    //         $('#sidebar').removeClass('active');
    //         // hide overlay
    //         $('.overlay').removeClass('active');
    //       });
    //
    //       $('#sidebarCollapse').on('click', function () {
    //         // open sidebar
    //         $('#sidebar').addClass('active');
    //         // fade in the overlay
    //         $('.overlay').addClass('active');
    //         $('.collapse.in').toggleClass('in');
    //         $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    //       });
    //     });
    // </script>

    const sideBarElement: HTMLElement = document.getElementById('sidebar');

    sideBarElement.classList.add('active');

    const overlayElement: HTMLElement = <HTMLElement>document.getElementsByClassName('overlay')[0];
    console.log(overlayElement);
    overlayElement.classList.add('active');

    // document.querySelector('a[aria-expanded=true]').




  }
  getStringSettings(name) {

  }
  setStringSettings(name, value) {

  }
  removeSettings(name) {

  }
  getAllKeysSettings()
  {

  }
}
