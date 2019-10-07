import { Request, Response } from 'express';
import ErrorException from './error.controller';
import { QueryPopulateOptions } from 'mongoose';
import IExperience from '../interfaces/IExperience';
import Experience from '../models/Experience';
import Ability from '../models/Ability';

export async function getPublicExperiences(req: Request, res: Response) {
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
    const experience: IExperience[] = await Experience.find({ public: true }).populate(populate).sort({ dateStart: 1 }).select({ public: 0, _id: 0, __v: 0 }) as IExperience[];

    res.json({
      data: experience
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getExperiences(req: Request, res: Response): Promise<Response> {
  try {
    const popute: QueryPopulateOptions = {
      path: Ability.collection.name,
      options: {
        sort: { order: 1 }
      }
    };
    const experiences: IExperience[] = await Experience.find().sort({ dateStart: 1 }).populate(popute) as IExperience[];

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
    const popute: QueryPopulateOptions = {
      path: Ability.collection.name,
      options: {
        sort: { order: 1 }
      }
    };
    const id: string = req.params.id;
    const experience: IExperience = await Experience.findById(id).populate(popute) as IExperience;

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
    const id: string = req.params.id;
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

