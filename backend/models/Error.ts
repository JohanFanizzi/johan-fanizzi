import { Schema, model } from 'mongoose';
import IError from '../interfaces/IError';

const schema: Schema = new Schema({
  message: String,
  data: {
    url: String,
    ip: String,
    header: String,
    query: String,
    methods: String,
    params: String,
    body: String
  },
  controlled: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

export default model<IError>('Error', schema)
