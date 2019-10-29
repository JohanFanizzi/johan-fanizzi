import { Router, Request, Response } from 'express';
const router = Router();

import passport from 'passport';
import { getToken } from '../libs/token';
import IUser from '../interfaces/IUser';

router.route('/')
  .get(passport.authenticate('google', { scope: ['profile'] }));

router.route('/callback')
  .get(passport.authenticate('google', { session: false, failureRedirect: '/' }), (req: Request, res: Response) => {
    const user: IUser = req.user as IUser;

    // Login correcto, devolver el token
    res.json({
      message: 'Login sucessfully.',
      data: {
        token: getToken(user._id)
      }
    });
  });

export default router;
