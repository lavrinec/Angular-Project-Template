import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
      private http: HttpClient
  ) { }

  getActivitiesByOwnerId(ownerId) {
    return this.http.get('/api/activity/user/' + ownerId);
  }

  createActivity(data) {
    delete data['id'];
    return this.http.post('/api/activity/vnext', data);
  }

  patchActivity(patchArray: object[]) {
    return this.http.patch('/api/activity', patchArray);
  }

  deleteActivity(activityId) {
    return this.http.delete('/api/activity/' + activityId);
  }
}
