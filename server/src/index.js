import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import booksData from './data/books.js';
import booksService from './services/books-service.js';
import reviewsData from './data/reviews.js';
import userCreateValidator from './validators/user-create-validator.js';
import bookCreateValidator from './validators/book-create-validator.js';
import bookUpdateValidator from './validators/book-update-validator.js';
import validateBody from './middlewares/validate-body.js';
import transformBody from './middlewares/transform-body.js';
import dotenv from 'dotenv';
import createToken from './auth/create-token.js';
import usersData from './data/users.js';
import dropDownData from './data/dropDownData.js';
import {authMiddleware, roleMiddleware} from './auth/auth-middleware.js';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import loggedUserGuard from './middlewares/loggedUserGuard.js';
import roleAuth from './middlewares/role-auth.js';
import {userRole} from './common/user-role.js';
import banGuard from './middlewares/ban-guard.js';
import reviewService from './services/review-service.js';
import reviewsLikeData from './data/reviewsLike.js';
import booksRatingData from './data/books-rating.js';
import userService from './services/user-service.js';
import reviewCreateValidator from './validators/review-create-validation.js';

const config = dotenv.config().parsed;

const PORT = config.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

/** Register */
app.post('/users', validateBody('user', userCreateValidator), async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userService.createUser(userData);
    if (!newUser) {
      return res.status(400).json({message: 'Username exist!'});
    }
    return res.status(200).send(newUser);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

/** Login */
app.post('/login', async (req, res) => {
  try {
    const user = await usersData.validateUser(req.body);
    if (user) {
      const token = createToken({
        users_id: user.users_id,
        user_name: user.user_name,
        is_admin: user.is_admin,
      });
      res.json({
        token,
      });
    } else {
      res.status(401).json({
        error: 'Invalid credentials!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

/** Logout */
app.delete('/logout', authMiddleware, async (req, res) => {
  try {
    await usersData.logoutUser(req.headers.authorization.replace('Bearer ', ''));

    res.json({
      message: 'Successfully logged out!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Retrieve all books (with pagination, filtering, sorting) */
app.get('/books', async (req, res) => {
  const {search, sort} = req.query;
  try {
    if (sort) {
      const theBooksSortedByYear = await booksData.sortBooksByYear(sort);
      return res.json(theBooksSortedByYear);
    }
    if (search) {
      const theBooksFoundByTitle = await booksData.searchBooksByTitle(search);
      return res.json(theBooksFoundByTitle);
    }

    const theBooks = await booksData.getAllBooks();
    res.json(theBooks);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Retrieve one book */
app.get('/books/:id', async (req, res) => {
  try {
    res.json(await booksData.getBookById(+req.params.id));
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});

/** Borrow a book */
app.post('/books/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  const {id} = req.params;
  try {
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
      return res.status(404).json({
        msg: `Book with id ${id} was not found!`,
      });
    }

    const bookBorrowed = await booksData.borrowBook(+id);
    if (!bookBorrowed) {
      return res.json({
        msg: `Book has already been borrowed!`,
      });
    }

    const setRecord = await booksData.setBorrowRecords(id, req.user.user_id);

    return res.status(200).send(await booksData.getBookByIdForUser(+id));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Return a book */
app.patch('/books/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  try {
    const isBookBorrowed = await booksData.isBookBorrowed(+req.params.id, req.user.user_id);
    if (!isBookBorrowed) {
      return res.status(404).json({
        message: 'Book not borrowed!',
      });
    }
    const book = await booksData.returnBook(+req.params.id);
    if (!book) {
      return res.json({
        msg: `Book has already been returned!`,
      });
    }

    const setRecord = await booksData.setReturnRecords(+isBookBorrowed.records_id);
    if (!setRecord) {
      return res.json({
        msg: `Something went wrong!`,
      });
    }

    return res.status(200).json(await booksData.getBookByIdForUser(+req.params.id));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Read book reviews */
app.get('/books/:id/reviews', authMiddleware, loggedUserGuard, async (req, res) => {
  const {id} = req.params;

  try {
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
      return res.status(404).json({
        msg: `Book with id ${id} was not found!`,
      });
    }

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
});

/** Create book review */
app.post('/books/:books_id/reviews', transformBody(reviewCreateValidator), validateBody('review', reviewCreateValidator), authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  const bookId = +req.params.books_id;
  const userId = +req.user.user_id;
  const book = await booksData.getBookById(+bookId);
  try {
    if (!book[0]) {
      return res.status(404).json({
        msg: `Book was not found!`,
      });
    }

    const check = (await reviewsData.userReviewByBookId(userId, bookId))[0];
    if (!check) {
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
});

/** Update book review */
app.patch('/reviews/:reviewId', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  const reviewId = req.params.reviewId;
  const updateData = req.body;

  try {
    const review = await reviewsData.getReviewById(+reviewId);

    if (!review) {
      res.status(404).send({
        message: 'Review not found!',
      });
    }

    if (review.users_id !== req.user.user_id) {
      return res.status(403).json({
        message: 'You are not authorized to update this review!',
      });
    }

    const reviewUpdated = await reviewService.updateReview(+reviewId, updateData);

    if (reviewUpdated) {
      res.send(await reviewsData.getReviewByIdForUser(+reviewId));
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Delete book review */
app.delete('/reviews/:reviews_id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  try {
    const review = await reviewsData.getReviewById(req.params.reviews_id);
    if (!review || review.is_deleted === 1) {
      return res.status(400).json({
        message: 'Review not found!',
      });
    }
    if (review.users_id !== req.user.user_id) {
      return res.status(403).json({
        message: 'You are not authorized to delete this review!',
      });
    }
    await reviewsData.deleteReview(req.params.reviews_id);

    res.status(200).send( await reviewsData.getReviewByIdForUser(+req.params.reviews_id));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Rate book */
app.put('/books/:id/rating', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
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
});

/** Like reviews */
app.put('/reviews/:reviews_id/review_likes', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  try {
    const reviewId = req.params.reviews_id;
    const reaction = req.body.reaction;
    const userId = req.user.user_id;
    const review = await reviewsData.getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({
        massage: 'Review not found!',
      });
    }

    const checkForLike = await reviewsLikeData.getReviewLikeByUser(reviewId, userId);
    if (checkForLike) {
      await reviewsLikeData.updateReviewLike(checkForLike.review_likes_id, reaction);
      return res.status(200).send(await reviewsLikeData.reviewLikesByBookAndUser(reviewId));
    }
    await reviewsLikeData.setLikeToReview(userId, reviewId, reaction);
    return res.status(200).send(await reviewsLikeData.reviewLikesByBookAndUser(reviewId));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Create any book (as admin) */
app.post('/books', transformBody(bookCreateValidator), validateBody('book', bookCreateValidator), authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookCreateValidator), async (req, res) => {
  try {
    const book = await booksData.createBook(req.body, req.user);
    res.json(book);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Read any book (as admin) */
app.get('/books/:id', authMiddleware, loggedUserGuard, roleMiddleware(userRole.Admin), async (req, res) => {
  try {
    res.json(await booksData.getAnyBookById(+req.params.id));
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});

/** Update any book (as admin) */
app.put('/books/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookUpdateValidator), async (req, res) => {
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
});

/** Delete any book (as admin) */
app.delete('/books/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
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

/** Read all reviews (as admin) */
app.get('/reviews', async (req, res) => {
  try {
    const review = await reviewsData.getAllReviews();
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Read any review (as admin) */
app.get('/reviews/:reviews_id', async (req, res) => {
  const reviewId = req.params.reviews_id;
  try {
    const review = await reviewsData.getAnyReviewById(+reviewId);
    res.send(review);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Update any review (as admin) */
app.patch('/admin/reviews/:reviews_id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const reviewId = req.params.reviews_id;
    const updateData = req.body;
    const review = await reviewsData.getReviewById(+reviewId);

    if (!review) {
      return res.status(404).send({
        message: 'Review not found!',
      });
    }
    const reviewUpdated = await reviewService.updateReview(+reviewId, updateData);

    if (reviewUpdated) {
      return res.status(200).send(await reviewsData.getReviewById(+reviewId));
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

/** Delete any review (as admin) */
app.delete('/admin/reviews/:reviews_id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const review = await reviewsData.getReviewById(req.params.reviews_id);
    if (!review || review.is_deleted === 1) {
      res.status(400).json({
        message: 'Review not found!',
      });
    }
    await reviewsData.deleteReview(req.params.reviews_id);

    res.status(200).json({
      message: `Review deleted`,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Ban users (as admin) */
app.post('/admin/users/:id/ban', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    await usersData.banUser(+req.params.id);
    return res.send(await usersData.getUserById(req.params.id));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Delete users (as admin) */
app.delete('/admin/users/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const user = await usersData.getUserById(req.params.id);

    if (!user || user.is_deleted) {
      return res.status(400).json({
        message: 'User not found or already was deleted!',
      });
    }

    await usersData.deleteUser(user.users_id);
    return res.status(200).json({
      message: 'User was successful deleted!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Get all users (as admin) */
app.get('/admin/users', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const users = await usersData.getAllUsers();
    res.json(users);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Return a user (as admin) */
app.put('/admin/users/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const user = await usersData.getUserById(req.params.id);
    if (!user) {
      res.status(400).json({
        message: 'User not found!',
      });
    }

    await usersData.returnUser(user.users_id);
    res.status(200).send(await usersData.getUserById(req.params.id));
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Get all genders */
app.get('/genders', async (req, res) => {
  try {
    const genders = await dropDownData.getAllGenders();
    res.json(genders);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Get all languages */
app.get('/languages', async (req, res) => {
  try {
    const languages = await dropDownData.getAllLanguages();
    res.json(languages);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Get all genders */
app.get('/genres', async (req, res) => {
  try {
    const genres = await dropDownData.getAllGenres();
    res.json(genres);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** Get all reactions */
app.get('/reactions', async (req, res) => {
  try {
    const reactions = await dropDownData.getAllReactions();
    res.json(reactions);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});


app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
