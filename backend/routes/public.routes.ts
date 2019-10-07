import { Router } from 'express';
const router = Router();

import { getPublicNetworks } from '../controllers/network.controller';

router.route('/network')
  .get(getPublicNetworks);

import { getPublicAbilities } from '../controllers/ability,controller';

router.route('/ability')
  .get(getPublicAbilities);

import { getPublicEducations } from '../controllers/education.controller';

router.route('/education')
  .get(getPublicEducations);

import { getPublicExperiences } from '../controllers/experience.controller';

router.route('/experience')
  .get(getPublicExperiences);

import { getPublicProject } from '../controllers/project.controller';

router.route('/project')
  .get(getPublicProject);

export default router;
