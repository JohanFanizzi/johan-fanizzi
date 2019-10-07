import { Schema, model } from 'mongoose';
import IProject from '../interfaces/IProject';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  abilities: [{
    type: Schema.Types.ObjectId,
    ref: 'Ability'
  }],
  order: {
    type: Number,
    default: 0
  },
  public: {
    type: Boolean,
    default: false
  }
});

export default model<IProject>('Project', schema);
