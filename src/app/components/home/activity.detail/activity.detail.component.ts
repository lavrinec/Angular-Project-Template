import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ActivityService } from '@src/app/shared/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '@src/app/components/Classes/Activity';
import { ActivityDTO } from '@src/app/components/Classes/ActivityDTO';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity.detail',
  templateUrl: './activity.detail.component.html',
  styleUrls: ['./activity.detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  static dateRegexISO8061 = new RegExp('/(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d)/');

  activity: Activity = new Activity();
  activityDTO: ActivityDTO;

  // dates
  startDate: string;
  startTime: string;

  constructor(
    private helper: HelperService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['activityId']) {
        this.getActivity(params['activityId']);
      }
    });
    this.activatedRoute.url.subscribe((e) => {
      if (this.activityDTO) {
        this.getActivity(this.activityDTO.id);
      }
    });
  }

  static parseDatesJSON(key: string, value) {
    if (typeof value === 'string') {
      const a = ActivityDetailComponent.dateRegexISO8061.test(value);
      if (a) {
        return new Date(new Date(value).toISOString().slice(0, -1));
      }
    }
    return value;
  }
  ngOnInit() {
  }
  getActivity(activityId: string|number) {
    this.activityService.getActivity(Number(activityId)).subscribe((activity: Activity) => {

      activity = JSON.parse(JSON.stringify(activity), ActivityDetailComponent.parseDatesJSON);

      this.activityDTO = new ActivityDTO();
      this.activityDTO.id = activity.id;
      if (!activity.remarks) {
        this.activityDTO.remarks = ' ';
      } else {
        this.activityDTO.remarks = activity.remarks;
      }
      this.activityDTO.startDate = this.splitDateObject(activity.startDateTime)[0];
      this.activityDTO.startTime = this.splitDateObject(activity.startDateTime)[1];
      this.activityDTO.endDate = this.splitDateObject(activity.endDateTime)[0];
      this.activityDTO.endTime = this.splitDateObject(activity.endDateTime)[1];
      if (!activity.location) {
        this.activityDTO.location = ' ';
      } else {
        this.activityDTO.location = activity.location;
      }
      this.activityDTO.isAbsent = activity.isAbsent;
      this.activityDTO.isPrivate = activity.isPrivate;
      this.activityDTO.wholeDay = activity.wholeDay;
      this.activityDTO.finished = activity.finished;
      console.log('aaaaa', this.activityDTO);
    });
  }

  goBack(): void {
    this.helper.goBack();
  }

  splitDateObject(date: Date): string[] {
    const offset = date.getTimezoneOffset();
    const date2 = moment(date).subtract(offset, 'minutes').toDate();
    const returnArray: string[] = [];
    // date
    const split1 = date2.toISOString().split('T');
    returnArray.push(split1[0]);
    // time
    const split2 = split1[1].split(':');
    returnArray.push(split2[0] + ':' + split2[1]);
    console.log('aaaaaa', returnArray);
    return returnArray;
  }


  edit() {
    const activityId = this.activityDTO.id;
    console.log('aaaaaaaaaa activity edit', activityId);
    this.router.navigate(['activity/activity-edit', activityId]);
  }

  delete() {
    const activityId = this.activityDTO.id;
    this.activityService.deleteActivity(activityId).subscribe((r) => {
      this.location.back();
    });
  }
}
