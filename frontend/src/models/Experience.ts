import Ability from './Ability';

export default class Experience {
  public company: string;
  public position: string;
  public description: string;
  public dateStart: Date;
  public dateEnd?: Date;
  public abilities: Ability[];

  constructor();
  constructor(
    company: string, position: string, description: string,
    dateStart: Date, dateEnd: Date, abilities: Ability[],
  );
  constructor(
    company?: string, position?: string, description?: string,
    dateStart?: Date, dateEnd?: Date, abilities?: Ability[],
  ) {
    this.company = company || '';
    this.position = position || '';
    this.description = description || '';
    this.dateStart = dateStart || new Date();
    this.dateEnd = dateEnd;
    this.abilities = abilities || [];
  }
}
