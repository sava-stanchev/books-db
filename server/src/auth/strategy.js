import dotenv from 'dotenv';
import passportJwt from 'passport-jwt';

const config = dotenv.config().parsed;

const options = {
    secretOrKey: config.PRIVATE_KEY,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
    const userData = {
        id: payload.sub,
        username: payload.username,
        role: payload.role
    };

    done(null, userData);
});

export default jwtStrategy;
