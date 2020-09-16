import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {
    EventSettingsModel,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService,
    FieldModel,
    ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import { RemindersService } from '@src/app/core/services/api/reminders.service';
import * as moment from 'moment';
import {ActivityService} from '@src/app/shared/services/activity.service';
import {AuthStateService} from '@src/app/core/services/state/auth-state.service';
import {HelperService} from "@src/app/core/services/utils/helper.service";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {Subscription} from "rxjs";

export class Reminder {
  id: number;
  name: string;
  startDateTime: Date | string;
  endDateTime: Date | string;
  reminderDateTime: Date | string;
  reminderEnabled: boolean;
  finished: boolean;
  startedBefore: boolean;
  active: boolean;
}

@Pipe({name: 'isReminderDue'})
export class IsReminderDue implements PipeTransform {
  transform(reminderDateTime: Date | string): boolean {
    const date = moment(reminderDateTime).toDate();
    return date.getTime() < (new Date()).getTime();
  }
}

@Pipe({name: 'sortReminders'})
export class SortReminders implements PipeTransform {
    transform(reminders: object[]): object[] {
        return reminders.sort((a, b) => {
            return (new Date(a['reminderDateTime']).getTime()) - (new Date(b['reminderDateTime']).getTime());
        });
    }
}

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class RemindersComponent implements OnInit {
    @ViewChild('scheduleComponent', {static: true}) scheduleComponentObj: ScheduleComponent;
  selectedDate: Date = new Date();
  fields: FieldModel = {
    id: 'id', startTime: {name: 'startDateTime'}, endTime: {name: 'endDateTime'}, subject: {name: 'remarks'},
    isReadonly: 'readOnly'
  };
  eventSettings: EventSettingsModel = { dataSource: [], fields: this.fields };
  remindersData: object[] = [];
  activityData: object[] = [];

  // edit
    @ViewChild('activityDetailDialog', {static: true}) activityDetailDialogObj: DialogComponent;
    activityInEdit: object;

  // reminders
    // delayOptions
    offsetOptions = [
        {offset: 15, unit: 'Minute', text: '15 min'},
        {offset: 30, unit: 'Minute', text: '30 min'},
        {offset: 1, unit: 'Hour', text: '1 h'},
        {offset: 2,  unit: 'Hours', text: '2 h'},
        {offset: 3, unit: 'Hours', text: '3 h'},
        {offset: 4, unit: 'Hours', text: '4 h'},
        {offset: 8, unit: 'Hours', text: '8 h'},
        {offset: 12, unit: 'Hours', text: '12 h'},
        {offset: 1, unit: 'Day', text: '1 dan'},
        {offset: 2, unit: 'Day', text: '2 dni'},
        {offset: 3, unit: 'Day', text: '3 dni'},
        {offset: 4, unit: 'Day', text: '4 dni'},
        {offset: 1, unit: 'Week', text: '1 teden'},
        {offset: 2, unit: 'Week', text: '2 tedna'},
    ];

  // other
  moment = moment;

  constructor(
      private remindersService: RemindersService,
      private activityService: ActivityService,
      private authStateService: AuthStateService,
      private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.getRemindersData();
    this.getUserActivityData();
  }

  getUserActivityData() {
      const userId = this.authStateService.userData.value.zaposleniId;
      this.activityService.getActivitiesByOwnerId(userId).subscribe((data: object[]) => {
          data = JSON.parse(JSON.stringify(data), this.helperService.parseDatesJSON);
          console.log('aaaaaaa', data);
          this.activityData = data;
          this.eventSettings.dataSource = this.activityData;
          this.eventSettings = {...this.eventSettings};
      });
  }

  getRemindersData() {
    this.remindersService.getActivityReminders().subscribe((res: object[]) => {
      console.log('aaaaa', res);
      // const data: Reminder[] = [];
      // res.forEach(item => {
      //   data.push(this.mapToReminder(item));
      // });
      // this.remindersData = data;
      this.remindersData = res;
      // this.eventSettings.dataSource = this.data;
      // this.eventSettings = {...this.eventSettings};
    });
  }

  mapToReminder(object): Reminder {
    let reminder = new Reminder();
    reminder = Object.assign(reminder, object);
    reminder.startDateTime = moment(object['reminderDateTime']).toDate();
    reminder.endDateTime = moment(reminder.startDateTime).add(15, 'minutes').toDate();
    return reminder;
  }

  // reminders event handlers
    dismissReminder(reminder) {
        reminder['reminderDateTime'] = null;
        reminder['reminderEnabled'] = false;
        const patchArray = [{id: reminder.id, reminderDateTime: null, reminderEnabled: false}];
        this.activityService.patchActivity(patchArray).subscribe(() => {
            this.getRemindersData();
        });
    }

    offsetReminder(reminder, offsetOptionsItem) {
        if (reminder && offsetOptionsItem) {
            const newReminderDate = moment(new Date()).add(offsetOptionsItem['offset'], offsetOptionsItem['unit']);
            const patchArray = [{id: reminder.id, reminderDateTime: newReminderDate}];
            this.activityService.patchActivity(patchArray).subscribe(() => {
               this.getRemindersData();
            });
        }
    }

  // calendar event handlers
    onActionComplete(args) {
      console.log('aaaa args', args);
      switch (args.requestType) {
          case 'eventCreated':
              args.addedRecords.forEach(record => {
                  record.startDateTime = moment(record.startDateTime).subtract(record.startDateTime.getTimezoneOffset(), 'minutes').toDate();
                  record.endDateTime = moment(record.endDateTime).subtract(record.endDateTime.getTimezoneOffset(), 'minutes').toDate();
                 this.activityService.createActivity(record).subscribe(() => {
                     this.getUserActivityData();
                 });
              });
              break;
          case 'eventChanged':
              const patchArray = [];
              args.changedRecords.forEach(record => {
                  record.startDateTime = moment(record.startDateTime).subtract(record.startDateTime.getTimezoneOffset(), 'minutes').toDate();
                  record.endDateTime = moment(record.endDateTime).subtract(record.endDateTime.getTimezoneOffset(), 'minutes').toDate();
                  const patchObj = {
                      id: record.id,
                      startDateTime: record.startDateTime,
                      endDateTime: record.endDateTime,
                      remarks: record.remarks,
                      wholeDay: record.wholeDay,
                  };
                  patchArray.push(patchObj);
              });
              this.activityService.patchActivity(patchArray).subscribe();
              break;
          case 'eventRemoved':
              args.deletedRecords.forEach((record, index) => {
                  this.activityService.deleteActivity(record.id).subscribe(() => {
                      if (index === args.deletedRecords.length - 1) {
                          this.getRemindersData();
                      }
                  });
              });
              break;
      }
    }

    onPopupOpen(args) {
      console.log('aaaaaaaa', args);
      if (args.type === 'Editor') {
          args.cancel = true;
          this.activityInEdit = args.data;
          this.activityDetailDialogObj.show();
          const sub = this.activityDetailDialogObj.close.subscribe(args => {
             console.log('aaaaa', args);
              (sub as Subscription).unsubscribe();
          });
      }
    }

    activityEditSave() {
      this.scheduleComponentObj.saveEvent(<{[key: string]: Object}>this.activityInEdit);
      const patchObj = {
        id: this.activityInEdit['id'],
        remarks: this.activityInEdit['remarks'],
        wholeDay: this.activityInEdit['wholeDay'],
        isPrivate: this.activityInEdit['isPrivate'],
        isAbsent: this.activityInEdit['isAbsent'],
        finished: this.activityInEdit['finished'],
        location: this.activityInEdit['location'],
      };
      this.activityService.patchActivity( [patchObj]).subscribe();
      this.activityInEdit = null;
      this.activityDetailDialogObj.hide();
    }
}
