import dotenv from "dotenv";
import passportJwt, { StrategyOptions, VerifiedCallback } from "passport-jwt";
import { TokenPayload } from "../types";

dotenv.config();

const config = process.env as { PRIVATE_KEY: string };

const options: StrategyOptions = {
  secretOrKey: config.PRIVATE_KEY,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(
  options,
  async (payload: TokenPayload, done: VerifiedCallback) => {
    const userData = {
      id: payload.id,
      username: payload.username,
      is_admin: payload.is_admin,
    };

    done(null, userData);
  }
);

export default jwtStrategy;
