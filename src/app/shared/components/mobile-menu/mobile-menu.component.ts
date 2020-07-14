import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-ui-sidedrawer/angular';
import { DrawerTransitionBase, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { filter } from 'rxjs/operators';
import { Helper } from '@core/services/utils/helper';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent implements OnInit, AfterViewInit {


  @ViewChild(RadSideDrawerComponent, { static: true }) public drawerComponent: RadSideDrawerComponent;
  private sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();
  private _drawer: SideDrawerType;
  private _activatedUrl = '/home';

  constructor(
      private router: Router,
      private routerExtensions: RouterExtensions,
  ) { }

  ngOnInit() {
    this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    console.log('tukaj umrem');
  }
  ngAfterViewInit() {
    this._drawer = this.drawerComponent.sideDrawer;
  }

  // todo action bar test
  onTap() {
    // Helper.onDrawerButtonTap();
    this.drawerComponent.sideDrawer.showDrawer();
  }
  // todo end

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade'
      }
    });
    this._drawer.closeDrawer();
  }

  toggle() {
    this._drawer.toggleDrawerState();
  }

  isComponentSelected() {
    return false;
  }

}
