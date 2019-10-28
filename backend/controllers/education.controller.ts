import { Request, Response } from 'express';
import ErrorException from './error.controller';
import { validate, educationSchema } from '../libs/joi';
import IEducation from '../interfaces/IEducation';
import Education from '../models/Education';
import { getAbilityPopulate } from './ability.controller';

export async function getEducations(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = req.filter ? req.filter : {};
    const filterPopulate: {} = req.populate ? req.populate.filter : {};
    const selectPopulate: {} = req.populate ? req.populate.select : {};
    const select: {} = req.select ? req.select : {};

    // Obtener los datos
    const educations: IEducation[] = await Education
      .find(filter)
      .populate(getAbilityPopulate(filterPopulate, selectPopulate))
      .sort({ dateStart: -1 })
      .select(select) as IEducation[];

    return res.json({
      data: educations
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getEducation(req: Request, res: Response): Promise<Response> {
  try {
    // Obtener Id
    const id: string = req.params.id;

    // Buscar educación
    const education: IEducation = await Education
      .findById(id)
      .populate(getAbilityPopulate()) as IEducation;

    return res.json({
      data: education
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function createEducation(req: Request, res: Response): Promise<Response> {
  try {
    // Validar campos
    const { error } = validate(req.body, educationSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Crear Educación
    const data: IEducation = req.body;
    const education: IEducation = new Education(data) as IEducation;
    await education.save();

    return res.json({
      message: 'Successfully created.',
      data: education
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function deleteEducation(req: Request, res: Response): Promise<Response> {
  try {
    // Obtener Id
    const id: string = req.params.id;

    // Eliminar educación
    await Education.findByIdAndRemove(id);

    return res.json({
      message: 'Successfully deleted.'
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function updateEducation(req: Request, res: Response): Promise<Response> {
  try {
    // Validar campos
    const { error } = validate(req.body, educationSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Actualizar Educación
    const id: string = req.params.id;
    const data: IEducation = req.body;
    const education: IEducation = await Education.findByIdAndUpdate(id, data, { new: true }) as IEducation;

    return res.json({
      message: 'Successfully updated.',
      data: education
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}
