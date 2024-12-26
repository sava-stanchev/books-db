import express from "express";
import booksData from "../data/books.js";
import bookRatingsData from "../data/book-ratings.js";
import reviewsData from "../data/reviews.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";
import { authMiddleware } from "../auth/auth-middleware.js";

const booksController = express.Router();

booksController

  // Get all books
  .get("/", authMiddleware, loggedUserGuard, async (req, res) => {
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

  // Get a book
  .get("/:id", authMiddleware, loggedUserGuard, async (req, res) => {
    const bookId = +req.params.id;
    try {
      const book = await booksData.getBookById(bookId);
      res.json(book);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  })

  // Get rating for book by user
  .post(
    "/:id/user-rating",
    authMiddleware,
    loggedUserGuard,
    async (req, res) => {
      const bookId = req.params.id;
      const userId = req.body.id;

      try {
        const userRating = await bookRatingsData.hasUserRatedBook(
          userId,
          bookId
        );

        res.json({
          rating: userRating !== null ? userRating.rating : 0,
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    }
  )

  // Get reviews for book
  .get("/:id/reviews", authMiddleware, loggedUserGuard, async (req, res) => {
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
  .post(
    "/:id/create-review",
    authMiddleware,
    loggedUserGuard,
    async (req, res) => {
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
    }
  )

  // Rate book
  .patch("/:id/rating", authMiddleware, loggedUserGuard, async (req, res) => {
    try {
      const bookId = req.params.id;
      const reqBody = req.body;
      const rating = reqBody.newRating;
      const userId = reqBody.user.id;

      await booksData.updateBookRating(bookId, rating);
      await bookRatingsData.addBookRating(bookId, userId, rating);
      const newBookData = await booksData.getBookById(bookId);
      return res.status(200).send(newBookData);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  })

  // Delete a book (as admin)
  .delete("/:id", authMiddleware, loggedUserGuard, async (req, res) => {
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
