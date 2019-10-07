import { Document } from 'mongoose';

export default interface IError extends Document {
  message: string;
  data: IErrorData;
  controlled: boolean;
  date?: Date;
}

export interface IErrorData extends Document {
  url: string;
  ip: string;
  header: string;
  query: string;
  methods: string;
  params: string;
  body: string;
}
