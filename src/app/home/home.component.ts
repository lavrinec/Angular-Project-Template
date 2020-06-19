import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthStateService } from '@src/app/core/services/state/auth-state.service';
import { NavigationEnd, Router } from '@angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from 'nativescript-angular/router';
import { filter } from 'rxjs/operators';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-ui-sidedrawer/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(RadSideDrawerComponent, { static: true }) public drawerComponent: RadSideDrawerComponent;

  private _activatedUrl = '/home';
  private sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();
  private _drawer: SideDrawerType;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private authStateService: AuthStateService,
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
  }

  ngAfterViewInit() {
    this._drawer = this.drawerComponent.sideDrawer;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade'
      }
    });
    this._drawer.closeDrawer();
  }

  logout() {
    this.authStateService.logout();
  }

  toggle() {
    this._drawer.toggleDrawerState();
  }
}
