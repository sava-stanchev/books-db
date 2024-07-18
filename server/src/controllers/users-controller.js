import express from "express";
import asyncHandler from "express-async-handler";
import usersService from "../services/users-service.js";
import usersData from "../data/users.js";
import serviceErrors from "../common/service-errors.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";
import { authMiddleware } from "../auth/auth-middleware.js";
import roleAuth from "../middlewares/role-auth.js";
import { userRole } from "../common/user-role.js";

const usersController = express.Router();

usersController

  /** Retrieve all users */
  .get("/", async (req, res) => {
    try {
      const users = await usersData.getAllUsers();
      res.json(users[0]);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  .post(
    "/",
    asyncHandler(async (req, res) => {
      const result = await usersService.createUser(usersData)(req.body);

      if (result.error === serviceErrors.DUPLICATE_RECORD) {
        res.status(409).json({ message: "Username or email already exists!" });
      } else {
        res.status(201).json(result.data);
      }
    })
  )

  /** Get user by ID */
  .get("/:id", authMiddleware, loggedUserGuard, async (req, res) => {
    try {
      const user = await usersData.getUserById(req.params.id);
      if (!user) {
        res.status(400).json({
          message: "User not found!",
        });
      }

      res.status(200).send(user);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  .delete("/:id", async (req, res) => {
    try {
      const user = await usersData.getUserById(+req.params.id);
      if (!user || user.is_deleted === 1) {
        return res.status(400).json({
          message: "User not found!",
        });
      }
      await usersData.deleteUser(+req.params.id);
      res.status(200).send(user);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

export default usersController;
