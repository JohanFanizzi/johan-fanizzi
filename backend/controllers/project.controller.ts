import { Request, Response } from 'express';
import ErrorException from './error.controller';
import { validate, projectSchema } from '../libs/joi';
import IProject from '../interfaces/IProject';
import Project from '../models/Project';
import { getAbilityPopulate } from './ability.controller';

export async function getProjects(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = req.filter ? req.filter : {};
    const filterPopulate: {} = req.populate ? req.populate.filter : {};
    const selectPopulate: {} = req.populate ? req.populate.select : {};
    const select: {} = req.select ? req.select : {};

    // Obtener los datos
    const project: IProject[] = await Project
      .find(filter)
      .populate(getAbilityPopulate(filterPopulate, selectPopulate))
      .sort({ order: 1 })
      .select(select) as IProject[];

    return res.json({
      data: project
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getProject(req: Request, res: Response): Promise<Response> {
  try {
    // Obtener id
    const id: string = req.params.id;

    // Buscar proyecto
    const project: IProject = await Project
      .findById(id)
      .populate(getAbilityPopulate()) as IProject;

    return res.json({
      data: project
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function createProject(req: Request, res: Response): Promise<Response> {
  try {
    // Validar campos
    const { error } = validate(req.body, projectSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Crear Proyecto
    const data: IProject = req.body;
    const project: IProject = new Project(data) as IProject;
    await project.save();

    return res.json({
      message: 'Successfully created.',
      data: project
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function deleteProject(req: Request, res: Response): Promise<Response> {
  try {
    // Obtener id
    const id: string = req.params.id;

    // Eliminar proyecto
    await Project.findByIdAndRemove(id);

    return res.json({
      message: 'Successfully deleted.'
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function updateProject(req: Request, res: Response): Promise<Response> {
  try {
    // Validar campos
    const { error } = validate(req.body, projectSchema);
    if(error) {
      return await ErrorException(true, error.message, req, res, 400);
    }

    // Actualizar Proyecto
    const id: string = req.params.id;
    const data: IProject = req.body;
    const project: IProject = await Project.findByIdAndUpdate(id, data, { new: true }) as IProject;

    return res.json({
      message: 'Successfully updated.',
      data: project
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}
