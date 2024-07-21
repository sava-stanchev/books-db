import express from "express";
import booksData from "../data/books.js";
import bookRatingsData from "../data/book-ratings.js";
import { authMiddleware } from "../auth/auth-middleware.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";
import reviewsData from "../data/reviews.js";

const booksController = express.Router();

booksController

  /** Retrieve all books */
  .get("/", async (req, res) => {
    const { sort } = req.query;
    try {
      if (sort) {
        const theBooksSortedByYear = await booksData.sortBooksByYear(sort);
        return res.json(theBooksSortedByYear);
      }

      const theBooks = await booksData.getAllBooks();
      res.json(theBooks);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  /** Retrieve one book */
  .get("/:id", async (req, res) => {
    const bookId = +req.params.id;
    try {
      const book = await booksData.getBookById(bookId);
      res.json(book[0]);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  })

  // Get reviews for book
  .get("/:id/reviews", async (req, res) => {
    try {
      const { id } = req.params;
      const theReviews = await reviewsData.getReviewsForBook(id);
      if (!theReviews) {
        return res.json({
          msg: "Book has no reviews yet!",
        });
      }

      return res.send(theReviews);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  // Create book review
  .post("/:id/create-review", async (req, res) => {
    const bookId = req.params.id;
    const newReview = req.body.newReview;
    const userId = req.body.user.id;

    try {
      await reviewsData.createReview(bookId, newReview, userId);
      res.end();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  })

  /** Rate book */
  .patch("/:id/rating", async (req, res) => {
    try {
      const bookId = req.params.id;
      const reqBody = req.body;
      const rating = reqBody.newRating;
      const userId = reqBody.user.id;

      await booksData.updateBookRating(bookId, rating);
      await bookRatingsData.addBookRating(bookId, userId);
      const newBookData = await booksData.getBookById(bookId);
      return res.status(200).send(newBookData[0]);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  })

  // Delete a book (as admin)
  .delete("/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      await booksData.deleteBook(bookId);
      res.end();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

export default booksController;
