import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import booksData from "../data/books.js";
import bookRatingsData from "../data/book-ratings.js";
import reviewsData from "../data/reviews.js";
import loggedUserGuard from "../middlewares/logged-user-guard.js";
import { authMiddleware } from "../auth/auth-middleware.js";
import { Review, User } from "src/types.js";

const booksController = express.Router();

booksController
  // Get all books
  .get(
    "/",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const books = await booksData.getAllBooks();
      res.json(books);
    })
  )

  // Get a book
  .get(
    "/:id",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const bookId = Number(req.params.id);
      const book = await booksData.getBookById(bookId);
      if (!book) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.json(book);
      }
    })
  )

  // Get rating for book by user
  .post(
    "/:id/user-rating",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const bookId = Number(req.params.id);
      const userId: number = req.body.id;
      const userRating = await bookRatingsData.hasUserRatedBook(userId, bookId);
      res.json({ rating: userRating?.rating || 0 });
    })
  )

  // Get reviews for book
  .get(
    "/:id/reviews",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const bookId = Number(req.params.id);
      const reviews = await reviewsData.getReviewsForBook(bookId);
      if (!reviews) {
        res.json({ msg: "Book has no reviews yet!" });
      } else {
        res.json(reviews);
      }
    })
  )

  // Create book review
  .post(
    "/:id/create-review",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const bookId = Number(req.params.id);
      const reviewContent: string = req.body.newReview;
      const userId: number = req.body.user.id;
      await reviewsData.createReview(bookId, reviewContent, userId);
      res.status(204).end();
    })
  )

  // Rate book
  .patch(
    "/:id/rating",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response) => {
      const bookId = Number(req.params.id);
      const { newRating, user }: { newRating: number; user: User } = req.body;
      await booksData.updateBookRating(bookId, newRating);
      await bookRatingsData.addBookRating(bookId, user.id, newRating);
      const newBookData = await booksData.getBookById(bookId);
      res.status(200).json(newBookData);
    })
  )

  // Delete a book (as admin)
  .delete(
    "/:id",
    authMiddleware,
    loggedUserGuard,
    asyncHandler(async (req: Request, res: Response): Promise<void> => {
      const bookId = parseInt(req.params.id, 10);
      const isDeleted = await booksData.deleteBook(bookId);
      if (isDeleted) {
        res.status(204).end();
      } else {
        res.status(500).json({ error: "Failed to delete book" });
      }
    })
  );

export default booksController;
