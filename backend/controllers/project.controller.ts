import { Request, Response } from 'express';
import ErrorException from './error.controller';
import IProject from '../interfaces/IProject';
import Project from '../models/Project';
import { getAbilityPopulate } from './ability.controller';

export async function getProjects(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = res.locals.filter;
    const filterPopulate: {} = res.locals.filterPopulate;
    const select: {} = res.locals.select;

    // Obtener los datos, si no existen filtro o el select se obtiene todo
    const project: IProject[] = await Project
      .find(filter)
      .populate(getAbilityPopulate(filterPopulate, select))
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
    const id: string = req.params.id;
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
    const id: string = req.params.id;
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
