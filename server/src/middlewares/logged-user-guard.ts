import tokensData from "../data/tokens.js";
import { Request, Response, NextFunction } from "express";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({ message: `You're not signed in!` });
    return;
  }

  const token = authorizationHeader.replace("bearer ", "");
  const result = await tokensData.getToken(token);

  if (!result) {
    res.status(401).json({ message: `You're not signed in!` });
    return;
  }

  next();
};
