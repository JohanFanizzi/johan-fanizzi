export default class Ability {
  public _id: string;
  public name: string;
  public icon: string;

  constructor();
  constructor(_id: string, name: string, icon: string);
  constructor(_id?: string, name?: string, icon?: string) {
    this._id = _id || '';
    this.name = name || '';
    this.icon = icon || '';
  }
}
