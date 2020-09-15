export class ActivityDTO {
  public id: number;
  public duration: string;
  public remarks: string;
  public location: string;
  public ownerId: number;
  public startDateTime: Date;
  public endDateTime: Date;
  public finished: true;
  public wholeDay: true;
  public isPrivate: true;
  public isAbsent: true;
  public isMeeting: true;
}
