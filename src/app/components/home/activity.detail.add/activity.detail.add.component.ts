import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { Router } from '@angular/router';

import { Activity } from '@src/app/components/Classes/Activity';
import { ActivityDTO } from '@src/app/components/Classes/ActivityDTO';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';
import { ActivityService } from '@src/app/shared/services/activity.service';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-activity.detail.add',
  templateUrl: './activity.detail.add.component.html',
  styleUrls: ['./activity.detail.add.component.scss']
})
export class ActivityDetailAddComponent implements OnInit {

  activity: Activity;
  activityDTO: ActivityDTO;

  constructor(public helper: HelperService,
              private activityService: ActivityService,
              private router: Router,
              private LSS: LocalStorageService,
              private location: Location

  ) {
    this.activityDTO = new ActivityDTO();
    // TODO ustvari prazni objekt čase daj na sedaj in konec + 15 min
    this.activityDTO.remarks = '';
    this.activityDTO.location = '';

    // TODO: POPRAVI da se bo ta DATETIME prav shranjeval in duration, reči Ninotu
    this.activityDTO.startDate = this.splitDateObject(new Date())[0];
    this.activityDTO.startTime = this.splitDateObject(new Date())[1];
    this.activityDTO.endDate = this.splitDateObject(moment().add(15, 'minutes').toDate())[0];
    this.activityDTO.endTime = this.splitDateObject(moment().add(15, 'minutes').toDate())[1];
    this.activityDTO.isAbsent = false;
    this.activityDTO.finished = false;
    this.activityDTO.wholeDay = false;
    this.activityDTO.isPrivate = false;

    console.log('aaa get contact', this.activityDTO);
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
    console.log('aaaaaaaaa edited contact', this.activityDTO);
    this.activity = new Activity();
    this.activity.duration = this.activityDTO.duration;
    this.activity.remarks = this.activityDTO.remarks;
    this.activity.ownerId = this.LSS.retrieve('userData').zaposleniId;
    // TODO: POPRAVI da se bo ta DATETIME prav shranjeval in duration, reči Ninotu
    this.activity.finished = this.activityDTO.finished;
    this.activity.wholeDay = this.activityDTO.wholeDay;
    this.activity.isPrivate = this.activityDTO.isAbsent;

    this.activity.startDateTime = this.combineDateTime(this.activityDTO.startDate, this.activityDTO.startTime);
    this.activity.endDateTime = this.combineDateTime(this.activityDTO.endDate, this.activityDTO.endTime);
    // this.activity.startDateTime = new Date(this.activity.startDateTime.toISOString().slice(0, -1));
    // this.activity.endDateTime = new Date(this.activity.endDateTime.toISOString().slice(0, -1));

    this.activityService.createActivity(this.activity).subscribe((r) => {
      this.location.back();
    });
  }

}
