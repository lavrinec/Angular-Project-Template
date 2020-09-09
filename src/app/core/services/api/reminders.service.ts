import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from "@src/app/components/Classes/Contact";

@Injectable({
    providedIn: 'root'
})
export class RemindersService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getActivityReminders() {
        return this.httpClient.get<any[]>('/api/activity/reminders');
    }

    getWorkItemReminders() {
        return this.httpClient.get<any[]>('/api/workItem/reminders');
    }
}
