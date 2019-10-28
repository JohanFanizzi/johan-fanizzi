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
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default model<IProject>('Project', schema);
