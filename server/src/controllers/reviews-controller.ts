import express from "express";
import asyncHandler from "express-async-handler";
import reviewsData from "../data/reviews.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";
import { authMiddleware } from "../auth/auth-middleware.js";

const reviewsController = express.Router();

reviewsController
  // Edit review
  .patch(
    "/:review_id",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req, res) => {
      const reviewId = Number(req.params.review_id);
      const updatedContent = req.body.updatedReviewContent;
      await reviewsData.editReview(reviewId, updatedContent);
      res.status(204).end();
    })
  )

  // Delete review
  .delete(
    "/:review_id",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req, res) => {
      const reviewId = Number(req.params.review_id);
      await reviewsData.deleteReview(reviewId);
      res.status(204).end();
    })
  );

export default reviewsController;
