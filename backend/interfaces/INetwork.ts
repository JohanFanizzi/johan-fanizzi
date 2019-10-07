import { Document } from 'mongoose';

export default interface INetwork extends Document {
  name: string;
  url: string;
  icon: string;
  order: number;
  public: string;
}
