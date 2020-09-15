import { Component, OnInit } from '@angular/core';
import { HelperService } from '@src/app/core/services/utils/helper.service';
import { ContactsService } from '@src/app/core/services/api/contacts.service';
import { Router } from '@angular/router';

import { Activity } from '@src/app/components/Classes/Activity';
import { ActivityDTO } from '@src/app/components/Classes/ActivityDTO';
import { LocalStorageService } from '@src/app/shared/services/local-storage.service';
import { ActivityService } from '@src/app/shared/services/activity.service';

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
              private LSS: LocalStorageService) {
    this.activityDTO = new ActivityDTO();
    // TODO ustvari prazni objekt čase daj na sedaj in konec + 15 min
    this.activityDTO.duration = '';
    this.activityDTO.remarks = '';
    // TODO: POPRAVI da se bo ta DATETIME prav shranjeval in duration, reči Ninotu
    // this.activityDTO.startDateTime = this.activityDTO.startDateTime;
    // this.activityDTO.endDateTime = this.activityDTO.endDateTime;
    console.log('aaa get contact', this.activityDTO);
  }

  ngOnInit() {
  }

  goBack(): void {
    this.helper.goBack();
  }

  save() {
    console.log('aaaaaaaaa edited contact', this.activityDTO);
    this.activity = new Activity();
    this.activity.duration = this.activityDTO.duration;
    this.activity.remarks = this.activityDTO.remarks;
    this.activity.ownerId = this.LSS.retrieve('userData').zaposleniId;
    // TODO: POPRAVI da se bo ta DATETIME prav shranjeval in duration, reči Ninotu
    this.activity.startDateTime = this.activityDTO.startDateTime;
    this.activity.endDateTime = this.activityDTO.endDateTime;
    this.activity.finished = this.activityDTO.finished;
    this.activity.wholeDay = this.activityDTO.wholeDay;
    this.activity.isPrivate = this.activityDTO.isAbsent;
    this.activity.isMeeting = this.activityDTO.isMeeting;
    this.activityService.createActivity(this.activity).subscribe((r) => {
      this.router.navigate(['home']);
    });
  }

}
