import { Request, Response } from 'express';
import IAbility from '../interfaces/IAbility';
import Ability from '../models/Ability';
import ErrorException from './error.controller';
import Education from '../models/Education';
import Experience from '../models/Experience';

export async function getAbilities(req: Request, res: Response): Promise<Response> {
  try {
    const abilities: IAbility[] = await Ability.find().sort({ order: 1 }) as IAbility[];

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
