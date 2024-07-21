import express from "express";
import reviewsData from "../data/reviews.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";

const reviewsController = express.Router();

reviewsController

  // Edit review
  .patch("/:review_id", loggedUserGuard, async (req, res) => {
    const reviewId = req.params.review_id;
    const updatedContent = req.body.updatedReviewContent;

    try {
      await reviewsData.editReview(reviewId, updatedContent);
      res.end();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  // Delete review
  .delete("/:review_id", loggedUserGuard, async (req, res) => {
    try {
      await reviewsData.deleteReview(req.params.review_id);
      res.end();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

export default reviewsController;
