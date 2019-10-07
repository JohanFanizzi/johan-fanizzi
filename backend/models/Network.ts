import { Schema, model } from 'mongoose';
import INetwork from '../interfaces/INetwork';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
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
    type: String,
    default: false
  }
});

export default model<INetwork>('Network', schema);
