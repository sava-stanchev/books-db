import dotenv from 'dotenv';
import passportJwt from 'passport-jwt';

const config = dotenv.config().parsed;

const options = {
  secretOrKey: config.PRIVATE_KEY,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
  const userData = {
    user_id: payload.users_id,
    user_name: payload.user_name,
    is_admin: payload.is_admin,
  };

  done(null, userData);
});

export default jwtStrategy;
