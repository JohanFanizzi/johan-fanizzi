import { Schema, model } from 'mongoose';
import IExperience from '../interfaces/IExperience';

const schema: Schema = new Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date
  },
  abilities: [{
    type: Schema.Types.ObjectId,
    ref: 'Ability'
  }],
  public: {
    type: Boolean,
    default: false
  }
});

export default model<IExperience>('Experience', schema);
