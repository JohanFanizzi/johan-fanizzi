import { Document } from 'mongoose';
import IAbility from './IAbility';

export default interface IEducation extends Document {
  institution: string;
  degree: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  abilities: IAbility[];
  isPublic: boolean;
}
