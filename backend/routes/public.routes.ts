import { Router, NextFunction, Request, Response } from 'express';
const router = Router();

import { getNetworks } from '../controllers/network.controller';
import { getAbilities, getMyTimeline } from '../controllers/ability.controller';
import { getEducations } from '../controllers/education.controller';
import { getExperiences } from '../controllers/experience.controller';
import { getProjects } from '../controllers/project.controller';

// Función para añadir el filtro public y eliminar campos internos
function middlewarePublicConfig(req: Request, res: Response, next: NextFunction) {
  // Si se recibe un Ability ID es que se está realizando un filtro.
  if(req.params.abilityId) {
    req.filter = { isPublic: true, abilities: req.params.abilityId };
  } else {
    // Se filtran los datos para optener los datos publicos
    req.filter = { isPublic: true };
  }

  // Filtro para las clases que contienen información de las habilidades
  req.populate = {
    filter: { isPublic: true },
    select: { isPublic: 0, order: 0, __v: 0 }
  };

  // Para poder realizar filtros sobre las habilidades se tiene que devolver el ID, para el resto no hace falta
  if(req.path.includes('/ability')) {
    req.select = { isPublic: 0, order: 0, __v: 0 };
  } else {
    req.select = { isPublic: 0, order: 0, _id: 0, __v: 0 };
  }

  next();
}

// Construcción de las rutas publicas, llamando previamente al middleware para realizar los filtros.
router.route('/network').get(middlewarePublicConfig, getNetworks);
router.route('/ability').get(middlewarePublicConfig, getAbilities);
router.route('/education').get(middlewarePublicConfig, getEducations);
router.route('/experience').get(middlewarePublicConfig, getExperiences);
router.route('/project').get(middlewarePublicConfig, getProjects);
router.route('/my-timeline').get(getMyTimeline);

// Se llama a la misma función debido a que el filtro del ID se añade en el middleware
router.route('/education/:abilityId').get(middlewarePublicConfig, getEducations);
router.route('/experience/:abilityId').get(middlewarePublicConfig, getExperiences);
router.route('/project/:abilityId').get(middlewarePublicConfig, getProjects);
router.route('/my-timeline/:abilityId').get(middlewarePublicConfig, getMyTimeline);

export default router;
