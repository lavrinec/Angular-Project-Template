import { Component, OnInit } from '@angular/core';
import { Activity } from '@src/app/components/Classes/Activity';
import { ActivityDTO } from '@src/app/components/Classes/ActivityDTO';
import { ActivityDetailComponent } from '@src/app/components/home/activity.detail/activity.detail.component';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ActivityService } from '@src/app/shared/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-activity.detail.edit',
  templateUrl: './activity.detail.edit.component.html',
  styleUrls: ['./activity.detail.edit.component.scss']
})
export class ActivityDetailEditComponent implements OnInit {

  activity: Activity = new Activity();
  activityDTO: ActivityDTO;
  constructor(
    private helper: HelperService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['activityId']) {
        this.activityService.getActivity(Number(params['activityId'])).subscribe((activity: Activity) => {

          activity = JSON.parse(JSON.stringify(activity), ActivityDetailEditComponent.parseDatesJSON);
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
        });
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

  combineDateTime(dateString: string, timeString: string): Date {
    return new Date(dateString + 'T' + timeString + 'Z');
  }


  save() {
    this.activity.id = this.activityDTO.id;
    this.activity.remarks = this.activityDTO.remarks;

    this.activity.isAbsent = this.activityDTO.isAbsent;
    this.activity.wholeDay = this.activityDTO.wholeDay;
    this.activity.isPrivate = this.activityDTO.isPrivate;
    this.activity.finished = this.activityDTO.finished;
    this.activity.location = this.activityDTO.location;

    // patch dates
    this.activity.startDateTime = this.combineDateTime(this.activityDTO.startDate, this.activityDTO.startTime);
    this.activity.endDateTime = this.combineDateTime(this.activityDTO.endDate, this.activityDTO.endTime);
    // this.activity.startDateTime = new Date(this.activity.startDateTime.toISOString().slice(0, -1));
    // this.activity.endDateTime = new Date(this.activity.endDateTime.toISOString().slice(0, -1));


    this.activityService.patchActivity([this.activity]).subscribe(() => {
      this.location.back();
    });

  }
}
