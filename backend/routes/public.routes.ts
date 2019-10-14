import { Router } from 'express';
const router = Router();

import {
  getPublicNetworks, getPublicAbilities, getPublicEducations, getPublicExperiences, getPublicProject, getMyTimeline
} from '../controllers/public.controller';

router.route('/network').get(getPublicNetworks);

router.route('/ability').get(getPublicAbilities);

router.route('/education').get(getPublicEducations);

router.route('/experience').get(getPublicExperiences);

router.route('/my-timeline').get(getMyTimeline);

router.route('/project').get(getPublicProject);

export default router;
