import { Request, Response } from 'express';
import ErrorException from './error.controller';
import { validate, experienceSchema } from '../libs/joi';
import IExperience from '../interfaces/IExperience';
import Experience from '../models/Experience';
import { getAbilityPopulate } from './ability.controller';

export async function getExperiences(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = req.filter ? req.filter : {};
    const filterPopulate: {} = req.populate ? req.populate.filter : {};
    const selectPopulate: {} = req.populate ? req.populate.select : {};
    const select: {} = req.select ? req.select : {};

    // Obtener los datos
    const experiences: IExperience[] = await Experience
      .find(filter)
      .sort({ dateStart: -1 })
      .populate(getAbilityPopulate(filterPopulate, selectPopulate))
      .select(select) as IExperience[];

    return res.json({
      data: experiences
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getExperience(req: Request, res: Response): Promise<Response> {
  try {
    // Obtener ID
    const id: string = req.params.id;

    // Buscar experiencia
    const experience: IExperience = await Experience
      .findById(id)
      .populate(getAbilityPopulate()) as IExperience;

    return res.json({
      data: experience
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function createExperience(req: Request, res: Response): Promise<Response> {
  try {
    // Validar campos
    const { error } = validate(req.body, experienceSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Crear Experiencia
    const data: IExperience = req.body;
    const experience: IExperience = new Experience(data);
    await experience.save();

    return res.json({
      message: 'Successfully saved.',
      data: experience
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function deleteExperience(req: Request, res: Response): Promise<Response> {
  try {
    // Obtener ID
    const id: string = req.params.id;

    // Eliminar Experiencia
    await Experience.findByIdAndRemove(id);

    return res.json({
      message: 'Successfully deleted.'
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function updateExperience(req: Request, res: Response): Promise<Response> {
  try {
    // Validar campos
    const { error } = validate(req.body, experienceSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Actualizar Experiencia
    const id: string = req.params.id;
    const data: IExperience = req.body;
    const experience: IExperience = await Experience.findByIdAndUpdate(id, data, { new: true }) as IExperience;

    return res.json({
      message: 'Successfully updated.',
      data: experience
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

