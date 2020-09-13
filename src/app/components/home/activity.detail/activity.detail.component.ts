import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ActivityService } from '@src/app/shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '@src/app/components/Classes/Activity';
import { ActivityDTO } from '@src/app/components/Classes/ActivityDTO';

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

  constructor(
    private helper: HelperService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['activityId']) {
        this.activityService.getActivity(Number(params['activityId'])).subscribe((activity: Activity) => {

          activity = JSON.parse(JSON.stringify(activity), ActivityDetailComponent.parseDatesJSON);
          this.activityDTO = new ActivityDTO();
          console.log('aaaaaaaaaaaa activity', this.activityDTO);
          this.activityDTO.id = activity.id;
          console.log('aaaaaaaaaaaa blreh', this.activityDTO);
          this.activityDTO.remarks = activity.remarks;

          this.activityDTO.startDate = activity.startDate;
          this.activityDTO.startTime = activity.startTime;
          this.activityDTO.startDate = activity.startDate;
          this.activityDTO.endDateTime = activity.endDateTime;
          if (!activity.location) {
            this.activityDTO.location = ' ';
          } else {
            this.activityDTO.location = activity.location;
          }
          this.activityDTO.isAbsent = activity.isAbsent;
          this.activityDTO.isPrivate = activity.isPrivate;
          this.activityDTO.wholeDay = activity.wholeDay;
          this.activityDTO.finished = activity.finished;


          console.log('aaa get contact', this.activityDTO);
        });
      console.log(Number(params['activityId']));
      }
    });
  }

  static parseDatesJSON(key: string, value) {
    if (typeof value === 'string') {
      const a = ActivityDetailComponent.dateRegexISO8061.test(value);
      if (a) {
        return new Date(value);
      }
    }
    return value;
  }
  ngOnInit() {
  }

  goBack(): void {
    this.helper.goBack();
  }
}
