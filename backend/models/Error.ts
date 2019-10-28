import { Schema, model } from 'mongoose';
import IError from '../interfaces/IError';

const schema: Schema = new Schema({
  message: {
    type: String,
    required: true
  },
  data: {
    url: String,
    ip: String,
    header: String,
    query: String,
    methods: String,
    params: String,
    body: String
  },
  controlled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default model<IError>('Error', schema)
