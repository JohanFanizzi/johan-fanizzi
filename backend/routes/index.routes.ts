import { Router } from 'express';
const router = Router();

// Redes Sociales
import {
  getNetworks, createNetwrok, getNetwork, updateNetwork, deleteNetwork
} from '../controllers/network.controller';

router.route('/network')
  .get(getNetworks)
  .post(createNetwrok);

router.route('/network/:id')
  .get(getNetwork)
  .put(updateNetwork)
  .delete(deleteNetwork);

// Habilidades
import {
  getAbilities, createAbility, getAbility, updateAbility, deleteAbility
} from '../controllers/ability.controller';

router.route('/ability')
  .get(getAbilities)
  .post(createAbility);

router.route('/ability/:id')
  .get(getAbility)
  .put(updateAbility)
  .delete(deleteAbility);

// Educación
import {
  getEducations, createEducation, getEducation, updateEducation, deleteEducation
} from '../controllers/education.controller';

router.route('/education')
  .get(getEducations)
  .post(createEducation);

router.route('/education/:id')
  .get(getEducation)
  .put(updateEducation)
  .delete(deleteEducation);

// Experiencia
import {
  getExperiences, createExperience, getExperience, updateExperience, deleteExperience
} from '../controllers/experience.controller';

router.route('/experience')
  .get(getExperiences)
  .post(createExperience);

router.route('/experience/:id')
  .get(getExperience)
  .put(updateExperience)
  .delete(deleteExperience);

// Proyectos
import {
  getProjects, createProject, getProject, deleteProject, updateProject
} from '../controllers/project.controller';

router.route('/project').
  get(getProjects)
  .post(createProject);

router.route('/project/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default router;
