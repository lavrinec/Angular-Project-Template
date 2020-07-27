import { Injectable, OnInit } from '@angular/core';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Router} from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';


@Injectable({
  providedIn: 'root'
})
export class HelperService implements OnInit {

  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
  ) { }

  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade'
      }
    });

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

  onDrawerButtonTap(): void {
    const sideDrawer: RadSideDrawer = <RadSideDrawer>app.getRootView();
    // console.log('service: kliknil na gumbek side drawer', <RadSideDrawer>app.getRootView());
    sideDrawer.showDrawer();
  }

}
