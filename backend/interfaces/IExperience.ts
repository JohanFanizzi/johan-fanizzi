import { Document } from 'mongoose';
import IAbility from './IAbility';

export default interface IExperience extends Document {
  company: string;
  position: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  abilities: IAbility[];
  public: boolean;
}
