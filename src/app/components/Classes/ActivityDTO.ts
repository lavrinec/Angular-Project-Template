export class ActivityDTO {
  public id: number;
  public duration: string;
  public remarks: string;
  public location: string;
  public ownerId: number;
  public startDateTime: Date;
  public startDate: string = '';
  public startTime: string = '';
  public endDate: string = '';
  public endTime: string = '';
  public endDateTime: Date;
  public finished: boolean;
  public wholeDay: boolean;
  public isPrivate: boolean;
  public isAbsent: boolean;
}
