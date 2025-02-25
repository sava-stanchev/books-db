import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import usersService from "../services/users-service";
import usersData from "../data/users";
import serviceErrors from "../common/service-errors";
import loggedUserGuard from "../middlewares/logged-user-guard";
import { authMiddleware } from "../auth/auth-middleware";

const usersController = express.Router();

usersController

  // Get all users
  .get(
    "/",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const users = await usersData.getAllUsers();
      res.status(200).json(users);
    })
  )

  // Register user
  .post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
      const result = await usersService.createUser(usersData)(req.body);

      if (result.error === serviceErrors.DUPLICATE_RECORD) {
        res.status(409).json({ message: "Username or email already exists!" });
      } else {
        res.status(201).json(result.data);
      }
    })
  )

  // Delete user
  .delete(
    "/:id",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const isDeleted = await usersData.deleteUser(+req.params.id);
      if (isDeleted) {
        res.status(204).end();
      }
    })
  );

export default usersController;
