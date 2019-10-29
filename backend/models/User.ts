import { Schema, model } from 'mongoose';
import IUser from '../interfaces/IUser';

const schema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

export default model<IUser>('User', schema);
