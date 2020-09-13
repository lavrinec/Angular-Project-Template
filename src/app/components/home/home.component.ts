import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { AuthService } from '@src/app/core/services/api/auth.service';
import { AuthStateService } from '@src/app/core/services/state/auth-state.service';
import { Router } from '@angular/router';
import { UserData } from '@src/app/components/Classes/UserData';
import { ActivityService } from '@src/app/shared/services/activity.service';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';
import { CalendarDayViewEventSelectedData } from 'nativescript-ui-calendar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'sass-project';
  user: UserData;
  eventSource;
 constructor(
    private authService: AuthService,
    private helper: HelperService,
    private authStateService: AuthStateService,
    private router: Router,
    private LSS: LocalStorageService
  ) {}

  ngOnInit() {
   console.log('aaa home onInit');
   this.user = this.LSS.retrieve('userData');
    this.getUserActivity();
    console.log('aaaaa source calendar', this.eventSource);
   // this.authStateService.userData.subscribe((userData: UserData) => {
   //   console.log('aaaaaaaaaa 2', userData);
   // });
  }

  onDrawerButtonTap(): void {
    this.helper.onDrawerButtonTap();
  }
  // onDrawerButtonTap(): void {
  //   const sideDrawer: RadSideDrawer = <RadSideDrawer>app.getRootView();
  //   sideDrawer.showDrawer();
  // }

  async getUserActivity() {
    this.eventSource = [];
    this.eventSource = await this.helper.getUserActivity(this.user.zaposleniId);
  }

  onDateSelectedEvent(args) {
   console.log('aaaaa onDateSelectedEvent', args);
  }

  onDayViewEventSelected(args: CalendarDayViewEventSelectedData) {
   console.log('aaaa', args.eventData);
   const activityId = args.eventData['id'];
    // alert(
    //   {
    //     title: "Event Selected",
    //     message: JSON.stringify(args),
    //     okButtonText: "OK"
    //   });
    // console.log('aaaaa onDayViewEventSelectedEvent', args);
  }
}

