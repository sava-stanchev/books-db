import dotenv from "dotenv";
import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../types";

dotenv.config();

const config = process.env as { PRIVATE_KEY: string };

const createToken = (payload: TokenPayload): string => {
  if (!config.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not defined in the environment variables.");
  }

  const options: SignOptions = {
    expiresIn: 3600,
  };

  const token = jwt.sign(payload, config.PRIVATE_KEY, options);

  return token;
};

export default createToken;
