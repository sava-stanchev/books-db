import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import usersService from "../services/users-service.js";
import tokensData from "../data/tokens.js";
import usersData from "../data/users.js";
import serviceErrors from "../common/service-errors.js";
import createToken from "../auth/create-token.js";
import { TokenPayload, User } from "src/types.js";

const authController = express.Router();

authController

  .post(
    "/login",
    asyncHandler(async (req: Request, res: Response) => {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };
      const result = await usersService.validateUser(usersData)(
        username,
        password
      );

      if (result.error === serviceErrors.OPERATION_NOT_PERMITTED) {
        res.status(401).json({ message: "Invalid password!" });
        return;
      }

      if (result.error === serviceErrors.RECORD_NOT_FOUND) {
        res.status(400).json({ message: "User does not exist!" });
        return;
      }

      const user = result.data as User;

      const payload: TokenPayload = {
        id: user.id!,
        username: user.username,
        is_admin: user.is_admin || 0,
      };

      const token = createToken(payload);
      await tokensData.addToken(token);

      res.status(200).json({ token });
    })
  )

  .delete(
    "/logout",
    asyncHandler(async (req: Request, res: Response) => {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace(/^bearer\s/i, "");
        await tokensData.removeToken(token);
        res.json({ message: "Successfully logged out!" });
      } else {
        res.status(400).json({ message: "Authorization header is missing!" });
      }
    })
  );

export default authController;
