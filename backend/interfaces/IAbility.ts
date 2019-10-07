import { Document } from 'mongoose';

export default interface IAbility extends Document {
  name: string;
  icon: string;
  order: number;
  public: boolean;
}
