import express from "express";
import asyncHandler from "express-async-handler";
import usersService from "../services/users-service.js";
import usersData from "../data/users.js";
import serviceErrors from "../common/service-errors.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";

const usersController = express.Router();

usersController

  // Get all users
  .get("/", loggedUserGuard, async (req, res) => {
    try {
      const users = await usersData.getAllUsers();
      res.json(users[0]);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  // Register user
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

  // Delete user
  .delete("/:id", loggedUserGuard, async (req, res) => {
    try {
      await usersData.deleteUser(req.params.id);
      res.end();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

export default usersController;
