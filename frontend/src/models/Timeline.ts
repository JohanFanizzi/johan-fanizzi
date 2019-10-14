export default class Timeline {
  public title: string;
  public description: string;
  public date: Date;
  public education: boolean;

  constructor();
  constructor(title: string, description: string, date: Date, education: boolean);
  constructor(title?: string, description?: string, date?: Date, education?: boolean) {
    this.title = title || '';
    this.description = description || '';
    this.date = date || new Date();
    this.education = education || true;
  }
}
