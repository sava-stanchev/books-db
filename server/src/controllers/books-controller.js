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
    try {
      const { sort } = req.query;
      const books = sort
        ? await booksData.sortBooksByYear(sort)
        : await booksData.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  // Get a book
  .get("/:id", authMiddleware, loggedUserGuard, async (req, res) => {
    try {
      const bookId = +req.params.id;
      const book = await booksData.getBookById(bookId);
      if (!book) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.json(book);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  // Get rating for book by user
  .post(
    "/:id/user-rating",
    authMiddleware,
    loggedUserGuard,
    async (req, res) => {
      try {
        const bookId = req.params.id;
        const userId = req.body.id;
        const userRating = await bookRatingsData.hasUserRatedBook(
          userId,
          bookId
        );
        res.json({ rating: userRating?.rating || 0 });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  )

  // Get reviews for book
  .get("/:id/reviews", authMiddleware, loggedUserGuard, async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await reviewsData.getReviewsForBook(id);
      if (!reviews) {
        res.json({ msg: "Book has no reviews yet!" });
      } else {
        res.json(reviews);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  // Create book review
  .post(
    "/:id/create-review",
    authMiddleware,
    loggedUserGuard,
    async (req, res) => {
      try {
        const bookId = req.params.id;
        const newReview = req.body.newReview;
        const userId = req.body.user.id;
        await reviewsData.createReview(bookId, newReview, userId);
        res.end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  )

  // Rate book
  .patch("/:id/rating", authMiddleware, loggedUserGuard, async (req, res) => {
    try {
      const bookId = req.params.id;
      const { newRating, user } = req.body;
      await booksData.updateBookRating(bookId, newRating);
      await bookRatingsData.addBookRating(bookId, user.id, newRating);
      const newBookData = await booksData.getBookById(bookId);
      res.status(200).json(newBookData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  // Delete a book (as admin)
  .delete("/:id", authMiddleware, loggedUserGuard, async (req, res) => {
    try {
      const bookId = req.params.id;
      const isDeleted = await booksData.deleteBook(bookId);
      if (isDeleted) {
        return res.status(204).end();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default booksController;
