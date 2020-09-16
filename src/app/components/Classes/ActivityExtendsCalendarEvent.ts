import { CalendarEvent } from 'nativescript-ui-calendar';
import { Color } from 'tns-core-modules/color';

export class ActivityTns extends CalendarEvent {
  id: number;
  location: string;

  constructor(id: number, title: string, location: string, startDate: Date, endDate: Date, isAllDay?: boolean, eventColor?: Color) {
    super(title, startDate, endDate, isAllDay, eventColor);
    this.id = id;
    this.location = location;
    this.eventColor = new Color (200, 188, 26, 214);
  }
}
