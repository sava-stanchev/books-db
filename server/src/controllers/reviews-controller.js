import express from "express";
import reviewsData from "../data/reviews.js";

const reviewsController = express.Router();

reviewsController

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
