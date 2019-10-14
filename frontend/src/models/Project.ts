import Ability from './Ability';

export default class Project {
  public name: string;
  public description: string;
  public url: string;
  public abilities: Ability[];

  constructor();
  constructor(name: string, description: string, url: string, abilities: Ability[]);
  constructor(name?: string, description?: string, url?: string, abilities?: Ability[]) {
    this.name = name || '';
    this.description = description || '';
    this.url = url || '';
    this.abilities = abilities || [];
  }
}
