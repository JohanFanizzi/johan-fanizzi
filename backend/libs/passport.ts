import passport from 'passport';
import { Strategy as GoogleStrategy, Profile }  from 'passport-google-oauth20';
import User from '../models/User';

export default function configPassport(): void {
  // Obtener parametros de configuración
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = process.env.GOOGLE_CALLBACK_URL;

  // Comprobar los parametros
  if (typeof clientID === "undefined") {
    throw new Error("clientID is undefined");
  }

  if (typeof clientSecret === "undefined") {
    throw new Error("clientSecret is undefined");
  }

  if (typeof callbackURL === "undefined") {
      throw new Error("callbackURL is undefined");
  }

  // Configurar passport
  passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void
  ) => {
    // Buscar usuario por el Google ID
    const user = await User.findOne({ googleId: profile.id });

    // Comprobar si se ha encontrado un usuario
    if(!user) {
      return done(null, false);
    }

    // Devolver el usuario
    return done(null, user);
  }
  ));
}
