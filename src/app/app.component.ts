import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HelperService } from '@src/app/helper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _activatedUrl: string;
  // private _sideDrawerTransition: DrawerTransitionBase;
  constructor( private helper: HelperService, private router: Router) {

  }
  // constructor(private router: Router, private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject services.


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
}
