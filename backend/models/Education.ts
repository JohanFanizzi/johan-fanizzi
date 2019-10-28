import { Schema, model } from 'mongoose';
import IEducation from '../interfaces/IEducation';

const schema: Schema = new Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dateStart: {
    type: Date
  },
  dateEnd: {
    type: Date
  },
  abilities: [{
    type: Schema.Types.ObjectId,
    ref: 'Ability'
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default model<IEducation>('Education', schema);
