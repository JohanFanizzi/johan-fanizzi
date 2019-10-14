export default class Network {
  public name: string;
  public url: string;
  public icon: string;

  constructor();
  constructor(name: string, url: string, icon: string);
  constructor(name?: string, url?: string, icon?: string) {
    this.name = name || '';
    this.url = url || '';
    this.icon = icon || '';
  }
}
