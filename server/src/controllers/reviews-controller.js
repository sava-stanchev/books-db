import express from "express";
import reviewsData from "../data/reviews.js";

const reviewsController = express.Router();

reviewsController

  // Edit review
  .patch("/:review_id", async (req, res) => {
    const reviewId = req.params.review_id;
    const updateData = req.body;

    try {
      await reviewsData.editReview(reviewId, updateData);
      res.end();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  // Delete review
  .delete("/:review_id", async (req, res) => {
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
