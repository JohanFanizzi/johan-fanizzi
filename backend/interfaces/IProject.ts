import { Document } from 'mongoose';
import IAbility from './IAbility';

export default interface IProject extends Document {
  name: string;
  description: string;
  url: string;
  abilities: IAbility[];
  order: number;
  public: boolean;
}
