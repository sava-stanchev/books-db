import express from "express";
import cors from "cors";
import helmet from "helmet";
import reviewsData from "./data/reviews.js";
import dotenv from "dotenv";
import usersData from "./data/users.js";
import { authMiddleware } from "./auth/auth-middleware.js";
import passport from "passport";
import jwtStrategy from "./auth/strategy.js";
import loggedUserGuard from "./middlewares/logged-user-guard.js";
import roleAuth from "./middlewares/role-auth.js";
import { userRole } from "./common/user-role.js";
import booksController from "./controllers/books-controller.js";
import authController from "./controllers/auth-controller.js";
import usersController from "./controllers/users-controller.js";

const config = dotenv.config().parsed;
const PORT = config.PORT;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/", authController);
app.use("/avatars", express.static("avatars"));
app.use("/books", booksController);
app.use("/users", usersController);

app.get(
  "/reviews/:reviewId",
  authMiddleware,
  loggedUserGuard,
  async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const userId = req.user.userId;
      const review = await reviewsData.getReviewById(reviewId);
      if (review) {
        return res.status(200).send(review);
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
);

// Delete review
app.delete("/reviews/:reviews_id", async (req, res) => {
  try {
    await reviewsData.deleteReview(req.params.reviews_id);
    res.end();
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** update user info */
app.post(
  "/users/:id/update",
  authMiddleware,
  loggedUserGuard,
  roleAuth(userRole.Admin),
  async (req, res) => {
    try {
      const userInfo = req.body;
      await usersData.updateUser(userInfo);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
);

/** Delete users (as admin) */
app.delete(
  "/admin/users/:id",
  authMiddleware,
  loggedUserGuard,
  roleAuth(userRole.Admin),
  async (req, res) => {
    try {
      const user = await usersData.getUserById(req.params.id);

      if (!user || user.is_deleted) {
        return res.status(400).json({
          message: "User not found or already was deleted!",
        });
      }

      await usersData.deleteUser(user.id);
      return res.status(200).json({
        message: "User was successful deleted!",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
);

/** Return a user (as admin) */
app.put(
  "/admin/users/:id",
  authMiddleware,
  loggedUserGuard,
  async (req, res) => {
    try {
      const user = await usersData.getUserById(req.params.id);
      if (!user) {
        res.status(400).json({
          message: "User not found!",
        });
      }

      await usersData.returnUser(user.id);
      res.status(200).send(await usersData.getUserById(req.params.id));
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
);

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
