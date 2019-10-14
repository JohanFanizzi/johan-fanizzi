import Ability from './Ability';

export default class Education {
  public institution: string;
  public degree: string;
  public description: string;
  public dateStart: Date;
  public dateEnd?: Date;
  public abilities: Ability[];

  constructor();
  constructor(
    institution: string, degree: string, description: string,
    dateStart: Date, dateEnd: Date, abilities: Ability[],
  );
  constructor(
    institution?: string, degree?: string, description?: string,
    dateStart?: Date, dateEnd?: Date, abilities?: Ability[],
  ) {
    this.institution = institution || '';
    this.degree = degree || '';
    this.description = description || '';
    this.dateStart = dateStart || new Date();
    this.dateEnd = dateEnd;
    this.abilities = abilities || [];
  }
}
