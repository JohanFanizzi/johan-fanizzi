export default class Ability {
  public name: string;
  public icon: string;

  constructor();
  constructor(name: string, icon: string);
  constructor(name?: string, icon?: string) {
    this.name = name || '';
    this.icon = icon || '';
  }
}
