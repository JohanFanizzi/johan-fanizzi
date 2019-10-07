import { Request, Response } from 'express';
import ErrorException from './error.controller';
import { QueryPopulateOptions } from 'mongoose';
import Ability from '../models/Ability';
import IProject from '../interfaces/IProject';
import Project from '../models/Project';

export async function getPublicProject(req: Request, res: Response): Promise<Response> {
  try {
    const populate: QueryPopulateOptions = {
      path: Ability.collection.name,
      match: {
        public: { $gte: true }
      },
      options: {
        sort: { order: 1 }
      },
      select: { _id: 0, name: 1, icon: 1 }
    };
    const project: IProject[] = await Project.find({ public: true }).populate(populate).sort({ order: 1 }).select({ public: 0, order: 0, _id: 0, __v: 0 }) as IProject[];

    return res.json({
      data: project
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getProjects(req: Request, res: Response): Promise<Response> {
  try {
    const populate: QueryPopulateOptions = {
      path: Ability.collection.name,
      options: {
        sort: { order: 1 }
      }
    };
    const project: IProject[] = await Project.find().populate(populate).sort({ order: 1 }) as IProject[];

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
    const populate: QueryPopulateOptions = {
      path: Ability.collection.name,
      options: {
        sort: { order: 1 }
      }
    };
    const project: IProject = await Project.findById(id).populate(populate) as IProject;

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
