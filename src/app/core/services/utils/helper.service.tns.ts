import { Injectable, OnInit } from '@angular/core';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Router} from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import { UserData } from '@src/app/components/Classes/UserData';
import { AuthService } from '@src/app/core/services/api/auth.service';
import { Activity } from '@src/app/components/Classes/Activity';
import { ActivityTns } from '@src/app/components/Classes/ActivityExtendsCalendarEvent';
import { ActivityService } from '@src/app/shared/services/activity.service';
import { openUrl } from 'tns-core-modules/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class HelperService implements OnInit {
  dateRegexISO8061 = new RegExp('/(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d)/');

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private authService: AuthService,
    private activityService: ActivityService
  ) { }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  static dateRegexISO8061 = new RegExp('/(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d)/');

  private _sideDrawerTransition: DrawerTransitionBase;
  user: UserData;
  activity;
  eventSource: ActivityTns[] = [];
  /*
    * Json date parser
    * */
  static parseDatesJSON(key: string, value) {
    if (typeof value === 'string') {
      const a = HelperService.dateRegexISO8061.test(value);
      if (a) {
        return new Date(new Date(value).toISOString().slice(0, -1));
      }
    }
    return value;
  }

  ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
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
  getUserActivity(userId): Promise<ActivityTns[]> {
    return new Promise((resolve) => {
      const eventSource: ActivityTns[] = [];
      this.activityService.getActivitiesByOwnerId(userId).subscribe((data: Activity[]) => {
        data = JSON.parse(JSON.stringify(data), HelperService.parseDatesJSON);
        for (const v of data) {
          this.activity = new ActivityTns(v.id, v.remarks, v.location, v.startDateTime, v.endDateTime, v.wholeDay);
          eventSource.push(this.activity);
        }
        console.log('aa events', eventSource);
        resolve(eventSource);
      });
    });
  }

openEmail(email) {
    console.log(email);
  openUrl('mailto:' + email);
}

  openPhone(phone) {
    console.log(phone);
    openUrl('tel:' + phone);
  }

  openUrl(value: string) {
    openUrl(value);
  }

  parseDatesJSON(key: string, value) {
    if (typeof value === 'string') {
      const a = this.dateRegexISO8061.test(value);
      if (a) {
        return new Date(new Date(value).toISOString().slice(0, -1));
      }
    }
    return value;
  }
}
