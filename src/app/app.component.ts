import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { environment } from '@src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _activatedUrl: string;
  private location: string;
  locationArray = [];
  // private _sideDrawerTransition: DrawerTransitionBase;
  constructor( private helper: HelperService, public router: Router) {
    console.log(this.router);
    // if (!environment.nativeScript && window) {
    //   try {
    //     this.location = window.location.href;
    //     this.locationArray = this.location.split('/');
    //     console.log('aaaa', this.location);
    //   } catch (e) {}
    // }
  }
  // constructor(private router: Router, private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject core.


  ngOnInit(): void {
    this._activatedUrl = '/home';
    this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
  }

  onNavItemTap(navItemRoute: string) {
    this.helper.onNavItemTap(navItemRoute);
  }
  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }
  onSideBarToggle(event) {
    this.helper.onDrawerButtonTap();
  }
}
