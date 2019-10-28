import { Request, Response } from 'express';
import Error from '../models/Error';
import IError, { IErrorData } from '../interfaces/IError';

// Control y registro de errores
export default async function ErrorException(controlled: boolean, errMessage: string, req: Request, res: Response, errorCode?: number): Promise<Response> {
  // Mensaje de error para enviar al front
  let message: string = '';

  // Si es un error no controlado, se registra y se envia un mensaje estandar
  if(!controlled) {
    message = 'An unexpected error has ocurred.';

    // Registrar error
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
    // Si es controlado, no se registra y se devuelve el mensaje
    message = errMessage;
  }

  return res.status(errorCode ? errorCode : 500).json({
    message
  });
}
