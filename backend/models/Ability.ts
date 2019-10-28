import { Schema, model } from 'mongoose';
import IAbility from '../interfaces/IAbility';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    lowercase: true,
    required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default model<IAbility>('Ability', schema);
