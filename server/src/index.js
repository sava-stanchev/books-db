import express from "express";
import cors from "cors";
import helmet from "helmet";
import reviewsData from "./data/reviews.js";
import dotenv from "dotenv";
import usersData from "./data/users.js";
import dropDownData from "./data/dropDownData.js";
import { authMiddleware } from "./auth/auth-middleware.js";
import passport from "passport";
import jwtStrategy from "./auth/strategy.js";
import loggedUserGuard from "./middlewares/logged-user-guard.js";
import roleAuth from "./middlewares/role-auth.js";
import { userRole } from "./common/user-role.js";
import reviewService from "./services/review-service.js";
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

/** Get reviews from a user */
app.get("/profile/:userId/reviews", async (req, res) => {
  try {
    const userId = req.params.userId;
    const review = await reviewsData.getAllReviewForUser(userId);
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

// get review by bookId and userId
app.patch("/reviews/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.body.userId;
    const review = await reviewsData.userReviewByBookId(userId, bookId);
    if (review[0]) {
      return res.status(200).send(review[0]);
    }
    return null;
  } catch (error) {
    console.log(error);
  }
});

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

/** Update book review */
app.patch(
  "/reviews/:reviewId/update",
  authMiddleware,
  loggedUserGuard,
  async (req, res) => {
    const reviewId = req.params.reviewId;
    const updateData = req.body;
    try {
      const review = await reviewsData.getReviewById(+reviewId);
      if (!review) {
        res.status(404).send({
          message: "Review not found!",
        });
      }

      if (review.id !== req.user.id) {
        return res.status(403).json({
          message: "You are not authorized to update this review!",
        });
      }

      const reviewUpdated = await reviewService.updateReview(
        +reviewId,
        updateData
      );

      if (reviewUpdated) {
        res.send(await reviewsData.getReviewByIdForUser(+reviewId));
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
);

/** Delete book review */
app.delete(
  "/reviews/:reviews_id",
  authMiddleware,
  loggedUserGuard,
  async (req, res) => {
    try {
      const review = await reviewsData.getReviewById(req.params.reviews_id);
      if (!review || review.is_deleted === 1) {
        return res.status(400).json({
          message: "Review not found!",
        });
      }
      if (review.id !== req.user.id) {
        return res.status(403).json({
          message: "You are not authorized to delete this review!",
        });
      }

      await reviewsData.deleteReview(req.params.reviews_id);
      res.status(200).send(review);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
);

/** Read all reviews (as admin) */
app.get("/reviews", async (req, res) => {
  try {
    const review = await reviewsData.getAllReviews();
    res.send(review);
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

/** Get all languages */
app.get("/languages", async (req, res) => {
  try {
    const languages = await dropDownData.getAllLanguages();
    res.json(languages);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Get all genres */
app.get("/genres", async (req, res) => {
  try {
    const genres = await dropDownData.getAllGenres();
    res.json(genres);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
