import { Request, Response } from 'express';
import ErrorException from './error.controller';
import { validate, networkSchema } from '../libs/joi';
import Network from '../models/Network';
import INetwork from '../interfaces/INetwork';

export async function getNetworks(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = req.filter ? req.filter : {};
    const select: {} = req.select ? req.select : {};

    // Obtener los datos
    const networks: INetwork[] = await Network
      .find(filter)
      .sort({ order: 1 })
      .select(select) as INetwork[];

    return res.json({
      data: networks
    });
  } catch (err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getNetwork(req: Request, res: Response): Promise<Response> {
  try  {
    // Obtener id
    const id: string = req.params.id;

    // Buscar redes sociales
    const network: INetwork = await Network.findById(id) as INetwork;

    return res.json({
      data: network
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function createNetwrok(req: Request, res: Response): Promise<Response> {
  try  {
    // Validar campos
    const { error } = validate(req.body, networkSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Create Network
    const data: INetwork = req.body;
    const network: INetwork = new Network(data) as INetwork;
    await network.save();

    return res.json({
      message: 'Successfully created.',
      data: network
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function deleteNetwork(req: Request, res: Response): Promise<Response> {
  try  {
    // Obtener id
    const id: string = req.params.id;

    // Eliminar red social
    await Network.findByIdAndRemove(id);

    return res.json({
      message: 'Successfully deleted.'
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function updateNetwork(req: Request, res: Response): Promise<Response> {
  try  {
    // Validar campos
    const { error } = validate(req.body, networkSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Actualizar datos de
    const id: string = req.params.id;
    const data: INetwork = req.body as INetwork;
    const network: INetwork = await Network.findByIdAndUpdate(id, data, { new: true }) as INetwork;

    return res.json({
      message: 'Successfully updated.',
      data: network
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}
