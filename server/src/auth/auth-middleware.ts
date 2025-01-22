import passport from "passport";
import { RequestHandler } from "express";

const authMiddleware: RequestHandler = passport.authenticate("jwt", {
  session: false,
});

export { authMiddleware };
