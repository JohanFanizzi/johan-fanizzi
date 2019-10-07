import { Request, Response } from 'express';
import IError from '../interfaces/IError';
import Error from '../models/Error';
import { IErrorData } from '../interfaces/IError';

export default async function ErrorException(controlled: boolean, errMessage: string, req: Request, res: Response, errorCode?: number): Promise<Response> {
  let message: string = '';

  if(!controlled) {
    message = 'An unexpected error has ocurred.';

    const error: IError = new Error();
    error.message = errMessage;
    error.data = {
      url: req.originalUrl,
      ip: req.header('x-forwarded-for') || req.connection.remoteAddress as string,
      header: JSON.stringify(req.headers),
      query: JSON.stringify(req.query),
      methods: req.method,
      params: JSON.stringify(req.params),
      body: JSON.stringify(req.body)
    } as IErrorData;
    error.controlled = controlled;

    await error.save();
  } else {
    message = errMessage;
  }

  return res.status(errorCode ? errorCode : 500).json({
    message
  });
}
