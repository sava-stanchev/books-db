import express from 'express';
import bookCreateValidator from '../validators/book-create-validator.js';
import bookUpdateValidator from '../validators/book-update-validator.js';
import booksData from '../data/books.js';
import booksService from '../services/books-service.js';
import transformBody from '../middlewares/transform-body.js';
import {authMiddleware, roleMiddleware} from '../auth/auth-middleware.js';
import {userRole} from '../common/user-role.js';
import booksRatingData from '../data/books-rating.js';
import reviewCreateValidator from '../validators/review-create-validation.js';
import banGuard from '../middlewares/ban-guard.js';
import loggedUserGuard from '../middlewares/loggedUserGuard.js';
import validateBody from '../middlewares/validate-body.js';
import roleAuth from '../middlewares/role-auth.js';
import reviewsData from '../data/reviews.js';

// eslint-disable-next-line new-cap
const booksController = express.Router();

booksController

    /** Retrieve all books */
    .get('/', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      const {sort} = req.query;
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
    .get('/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      const bookId = +req.params.id;
      try {
        res.json(await booksData.getBookById(bookId));
      } catch (error) {
        return res.status(404).json({
          error: error.message,
        });
      }
    })

    /** Borrow a book */
    .post('/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      const bookId = req.params.id;
      const userId = req.user.user_id;
      try {
        const theBook = await booksData.getBookById(+bookId);
        if (!theBook) {
          return res.status(404).json({
            msg: `Book with id ${bookId} was not found!`,
          });
        }
        console.log('book controler');

        const bookBorrowed = await booksData.isBookBorrowed(+bookId, userId);
        if (bookBorrowed) {
          return res.json({
            msg: `Book has already been borrowed!`,
          });
        }

        const setRecord = await booksData.setBorrowRecords(bookId, userId);
        const setIsBorrowed = await booksData.borrowBook(bookId);

        return res.status(200).send(await booksData.getBookById(+bookId));
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    })

    /** Return a book */
    .patch('/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      const bookId = req.params.id;
      const userId = req.user.user_id;
      try {
        const isBookBorrowed = await booksData.isBookBorrowed(bookId, userId);
        if (!isBookBorrowed) {
          return res.status(404).json({
            message: 'Book not borrowed!',
          });
        }
        // const isBookReturned = await booksData.isBookBorrowedAndReturned(bookId, userId);
        // console.log(isBookReturned);

        // if (isBookReturned) {
        //   return res.json({
        //     msg: `Book has already been returned!`,
        //   });
        // }

        console.log('return');
        const setRecord = await booksData.setReturnRecords(+isBookBorrowed.records_id);
        if (!setRecord) {
          return res.json({
            msg: `Something went wrong!`,
          });
        }

        await booksData.returnBook(bookId);

        return res.status(200).json(await booksData.getBookById(bookId));
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    })

    /** Read book reviews */
    .get('/:id/reviews', authMiddleware, loggedUserGuard, async (req, res) => {
      try {
        const {id} = req.params;
        const theReviews = await reviewsData.getReviewsForBook(+id);
        if (!theReviews) {
          return res.json({
            msg: 'Book has no reviews yet!',
          });
        }

        return res.send(theReviews);
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    })

    /** Create book review */
    .post('/:id/create-review', transformBody(reviewCreateValidator), validateBody('review', reviewCreateValidator), authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      const bookId = +req.params.id;
      const userId = +req.user.user_id;
      const book = await booksData.getBookById(+bookId);
      try {
        if (!book[0]) {
          return res.status(404).json({
            msg: `Book was not found!`,
          });
        }

        const check = (await reviewsData.userReviewByBookId(userId, bookId))[0];
        if (check) {
          return res.status(200).json({
            message: 'Review already exist!',
          });
        }
        const review = await reviewsData.createReview(bookId, req.body.content, userId);

        return res.status(200).json(review);
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    })

    /** Get user rating for book */
    .get('/:id/rating', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      try {
        const bookId = req.params.id;
        const userId = req.user.user_id;
        const rating = await booksRatingData.getBookRatingByUser(bookId, userId);
        return rating?res.status(200).json(rating.rating):null;
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    })

    /** Rate book */
    .patch('/:id/rating', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
      try {
        const bookId = req.params.id;
        const rating = req.body.rating;
        const userId = req.user.user_id;
        const book = await booksData.getBookById(bookId);

        if (!book) {
          return res.status(404).json({
            massage: 'Book not found!',
          });
        }

        const isBookBorrowedAndReturned = await booksData.isBookBorrowedAndReturned(bookId, userId);

        if (!isBookBorrowedAndReturned) {
          return res.status(403).json({
            message: 'If you want to rate a book, you need to read it and return it first!',
          });
        }

        const checkForRating = await booksRatingData.getBookRatingByUser(bookId, userId);
        console.log('checkForRating');
        if (checkForRating) {
          await booksRatingData.updateBookRating(checkForRating.book_ratings_id, rating);
          return res.status(200).send(await booksData.bookAverageRating(bookId));
        }
        await booksRatingData.setRatingToBook(userId, bookId, rating);
        return res.status(200).send(await booksData.bookAverageRating(bookId));
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    })

    /** Create any book (as admin) */
    .put('/create', authMiddleware, loggedUserGuard, transformBody(bookCreateValidator), validateBody('book', bookCreateValidator), async (req, res) => {
      try {
        const book = await booksData.createBook(req.body, req.user);
        res.json(book);
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    })

    /** Read any book (as admin) */
    .get('/:id', authMiddleware, loggedUserGuard, roleMiddleware(userRole.Admin), async (req, res) => {
      try {
        res.json(await booksData.getAnyBookById(+req.params.id));
      } catch (error) {
        return res.status(404).json({
          error: error.message,
        });
      }
    })

    /** Update any book (as admin) */
    .put('/:id/update', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookUpdateValidator), async (req, res) => {
      const {id} = req.params;
      const updateData = req.body;

      try {
        const updatedBook = await booksService.updateBook(+id, updateData);

        if (!updatedBook) {
          res.status(404).send({
            message: 'Book not found!',
          });
        } else {
          res.send({
            message: 'Book updated!',
          });
        }
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    })

    /** Delete any book (as admin) */
    .delete('/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
      try {
        await booksData.deleteBook(+req.params.id);
        res.json({
          message: `Book deleted`,
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message,
        });
      }
    });

export default booksController;
