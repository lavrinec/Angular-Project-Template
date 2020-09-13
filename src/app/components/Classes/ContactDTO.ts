export class ContactDTO {
  public id: number;
  public firstName: string;
  public lastName: string;
  public function: string;
  public prefix: string ;
  public suffix: string;
  public isActive: true;
  birthday: Date | string;
  constructor() {}
}
