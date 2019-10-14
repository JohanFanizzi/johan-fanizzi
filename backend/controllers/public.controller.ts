import { Request, Response } from 'express';
import { QueryPopulateOptions } from 'mongoose';
import ErrorException from './error.controller';
import Network from '../models/Network';
import INetwork from '../interfaces/INetwork';
import Ability from '../models/Ability';
import IAbility from '../interfaces/IAbility';
import Education from '../models/Education';
import IEducation from '../interfaces/IEducation';
import Experience from '../models/Experience';
import IExperience from '../interfaces/IExperience';
import Project from '../models/Project';
import IProject from '../interfaces/IProject';

export async function getPublicNetworks(req: Request, res: Response): Promise<Response> {
  try {
    const networks: INetwork[] = await Network.find({ public: true }).sort({ order: 1 }).select({ public: 0, order: 0, _id: 0, __v: 0 }) as INetwork[];

    return res.json({
      data: networks
    });
  } catch (err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getPublicAbilities(req: Request, res: Response): Promise<Response> {
  try {
    const abilities: IAbility[] = await Ability.find({ public: true }).sort({ order: 1 }).select({ public: 0, order: 0, _id: 0, __v: 0 }) as IAbility[];

    return res.json({
      data: abilities
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

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

export async function getMyTimeline(req: Request, res: Response): Promise<Response> {
  try {
    const timeline: { title: string, description: string, date: Date, education: boolean }[] = [];

    const education: IEducation[] = await Education.find({ public: true }).sort({ order: 1 }).select({ _id: 0, institution: 1, degree: 1, dateStart: 1 });
    education.map((element) => timeline.push({
      title: element.institution,
      description: element.degree,
      date: element.dateStart,
      education: true
    }));

    const experience: IExperience[] = await Experience.find({ public: true }).sort({ order: 1 }).select({ _id: 0, company: 1, position: 1, dateStart: 1 });
    experience.map((element) => timeline.push({
      title: element.company,
      description: element.position,
      date: element.dateStart,
      education: false
    }));

    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return res.json({
      data: timeline
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

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
