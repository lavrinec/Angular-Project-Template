import { Injectable, OnInit } from '@angular/core';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Router} from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import { UserData } from '@src/app/components/Classes/UserData';
import { AuthService } from '@src/app/core/services/api/auth.service';
import { Label } from 'tns-core-modules/ui/label';


@Injectable({
  providedIn: 'root'
})
export class HelperService implements OnInit {

  private _sideDrawerTransition: DrawerTransitionBase;
  user: UserData;
  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private authService: AuthService
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

  closeDrawer() {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

  onDrawerButtonTap(): void {
   const sideDrawer: RadSideDrawer = <RadSideDrawer>app.getRootView();
   sideDrawer.showDrawer();
  }

  searchBarText(args) {
    const searchBar = args.object as SearchBar;
    return searchBar.text;
  }
 goBack() {
   this.routerExtensions.backToPreviousPage();
 }
}
