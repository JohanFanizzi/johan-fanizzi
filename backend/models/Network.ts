import { Schema, model } from 'mongoose';
import INetwork from '../interfaces/INetwork';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    lowercase: true,
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
    type: String,
    default: false
  }
}, {
  timestamps: true
});

export default model<INetwork>('Network', schema);
