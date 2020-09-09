import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, FieldModel } from '@syncfusion/ej2-angular-schedule';
import { RemindersService } from '@src/app/core/services/api/reminders.service';
import * as moment from 'moment';

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

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class RemindersComponent implements OnInit {
  selectedDate: Date = new Date();
  fields: FieldModel = {
    id: 'id', startTime: {name: 'startDateTime'}, endTime: {name: 'endDateTime'}, subject: {name: 'name'},
    isReadonly: 'readOnly'
  };
  eventSettings: EventSettingsModel = { dataSource: [], fields: this.fields };
  data: Reminder[] = [];

  constructor(
      private remindersService: RemindersService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.remindersService.getActivityReminders().subscribe((res: object[]) => {
      console.log('aaaaa', res);
      const data: Reminder[] = [];
      res.forEach(item => {
        data.push(this.mapToReminder(item));
      });
      this.data = data;
      this.eventSettings.dataSource = this.data;
      this.eventSettings = {...this.eventSettings};
    });
  }

  mapToReminder(object): Reminder {
    let reminder = new Reminder();
    reminder = Object.assign(reminder, object);
    reminder.startDateTime = moment(object['reminderDateTime']).toDate();
    reminder.endDateTime = moment(reminder.startDateTime).add(15, 'minutes').toDate();
    return reminder;
  }
}
