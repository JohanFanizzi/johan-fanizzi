import { Request, Response } from 'express';
import { QueryPopulateOptions } from 'mongoose';
import IAbility from '../interfaces/IAbility';
import Ability from '../models/Ability';
import ErrorException from './error.controller';
import Education from '../models/Education';
import IEducation from '../interfaces/IEducation';
import Experience from '../models/Experience';
import IExperience from '../interfaces/IExperience';

export function getAbilityPopulate(filter: {} = {}, select: {} = {}): QueryPopulateOptions {
  const populate: QueryPopulateOptions = {
    path: Ability.collection.name,
    match: filter,
    options: {
      sort: { order: 1 }
    },
    select: select
  };

  return populate;
}

export async function getAbilities(req: Request, res: Response): Promise<Response> {
  try {
    // comprobar si el middleware ha añadido filtros, estos se añades para las rutas publicas
    const filter: {} = res.locals.filter;
    const select: {} = res.locals.select;

    // Obtener los datos, si no existen filtro o el select se obtiene todo
    const abilities: IAbility[] = await Ability
      .find(filter ? filter : {})
      .sort({ order: 1 })
      .select(select ? select : {}) as IAbility[];

    return res.json({
      data: abilities
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function getAbility(req: Request, res: Response): Promise<Response> {
  try {
    const id: string = req.params.id;
    const ability: IAbility =  await Ability.findById(id) as IAbility;

    return res.json({
      data: ability
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

// Se implementa en Ability debido a que para el borrado se llaman las clases de educación y experiencia
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

export async function createAbility(req: Request, res: Response): Promise<Response> {
  try {
    const data: IAbility = req.body;
    const ability: IAbility = new Ability(data) as IAbility;
    await ability.save();

    return res.json({
      message: 'Successfully created.',
      data: ability
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function deleteAbility(req: Request, res: Response): Promise<Response> {
  try {
    const id: string = req.params.id;
    const ability: IAbility = await Ability.findByIdAndRemove(id) as IAbility;
    await Education.updateMany({ abilities: ability.id }, { "$pull": { abilities: ability.id } });
    await Experience.updateMany({ abilities: ability.id }, { "$pull": { abilities: ability.id } });

    return res.json({
      message: 'Successfully deleted.'
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}

export async function updateAbility(req: Request, res: Response): Promise<Response> {
  try {
    const id: string = req.params.id;
    const data: IAbility = req.body;
    const ability: IAbility = await Ability.findByIdAndUpdate(id, data, { new: true }) as IAbility;

    return res.json({
      message: 'Successfully updated.',
      data: ability
    });
  } catch(err) {
    console.error(err);
    return await ErrorException(false, err.message, req, res);
  }
}
