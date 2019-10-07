import { Schema, model } from 'mongoose';
import IAbility from '../interfaces/IAbility';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  public: {
    type: Boolean,
    default: false
  }
});

export default model<IAbility>('Ability', schema);
