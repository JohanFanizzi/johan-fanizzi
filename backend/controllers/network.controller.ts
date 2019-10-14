import { Request, Response } from 'express';
import Network from '../models/Network';
import INetwork from '../interfaces/INetwork';
import ErrorException from './error.controller';

export async function getNetworks(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = res.locals.filter;
    const select: {} = res.locals.select;

    // Obtener los datos, si no existen filtro o el select se obtiene todo
    const networks: INetwork[] = await Network
      .find(filter ? filter : {})
      .sort({ order: 1 })
      .select(select ? select : {}) as INetwork[];

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
    const id: string = req.params.id;
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
    const id: string = req.params.id;
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
