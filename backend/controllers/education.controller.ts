import { Request, Response } from 'express';
import ErrorException from './error.controller';
import IEducation from '../interfaces/IEducation';
import Education from '../models/Education';
import Ability from '../models/Ability';
import { QueryPopulateOptions } from 'mongoose';

export async function getPublicEducations(req: Request, res: Response): Promise<Response> {
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
    const educations: IEducation[] = await Education.find({ public: true }).populate(populate).sort({ dateStart: 1 }).select({ public: 0, _id: 0, __v: 0 }) as IEducation[];

    return res.json({
      data: educations
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getEducations(req: Request, res: Response): Promise<Response> {
  try {
    const popute: QueryPopulateOptions = {
      path: Ability.collection.name,
      options: {
        sort: { order: 1 }
      }
    };
    const educations: IEducation[] = await Education.find().populate(popute).sort({ dateStart: 1 }) as IEducation[];

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
    const id: string = req.params.id;
    const popute: QueryPopulateOptions = {
      path: Ability.collection.name,
      options: {
        sort: { order: 1 }
      }
    };
    const education: IEducation = await Education.findById(id).populate(popute) as IEducation;

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
    const id: string = req.params.id;
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
