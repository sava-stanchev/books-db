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
import bcrypt from 'bcrypt';
import usersData, {
  logoutUser,
} from './data/users.js';
import {
  authMiddleware,
} from './auth/auth-middleware.js';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import loggedUserGuard from './middlewares/loggedUserGuard.js';
import roleAuth from './middlewares/role-auth.js';
import {
  userRole,
} from './common/user-role.js';
import banGuard from './middlewares/ban-guard.js';
import pool from './data/pool.js';
import reviewService from './services/review-service.js';
import reviewsLikeData from './data/reviewsLike.js';
import booksRatingData from './data/books-rating.js';


const config = dotenv.config().parsed;

const PORT = config.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

/** register user
 *
 */
app.post('/users', loggedUserGuard, async (req, res) => {
  const user = req.body;
  try {
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await usersData.createUser(user);
    if (newUser.error) {
      return res.status(400).json(newUser.response);
    }

    res.json(newUser.response);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

/** login user
 *
 */
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

/** logout user
 *
 */
app.delete('/logout', authMiddleware, async (req, res) => {
  try {
    await logoutUser(req.headers.authorization.replace('Bearer ', ''));

    res.json({
      message: 'Successfully logged out!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** retrieve all books
 *
 */
app.get('/books', authMiddleware, loggedUserGuard, async (req, res) => {
  const {
    title,
    sort,
  } = req.query;
  try {
    if (sort) {
      const theBooksSortedByYear = await booksData.sortBooksByYear(sort);
      return res.json(theBooksSortedByYear);
    }
    if (title) {
      const theBooksFoundByTitle = await booksData.searchBooksByTitle(title);
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

/** create new book from admin
 *
 */
app.post('/admin/books', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookCreateValidator), async (req, res) => {
  try {
    const book = await booksData.createBook(req.body, req.user);
    res.json(book);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** book by id
 *
 */
app.get('/books/:id', authMiddleware, loggedUserGuard, async (req, res) => {
  try {
    res.json(await booksData.getBookById(+req.params.id));
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
});

/** update any book from admin
 *
 */
app.put('/admin/books/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookUpdateValidator), async (req, res) => {
  const {
    id,
  } = req.params;
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

/** delete any book from admin
 *
 */
app.delete('/admin/books/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
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

/** borrow a book by id
 *
 */
app.post('/books/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  const {
    id,
  } = req.params;
  try {
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
      return res.status(404).json({
        msg: `Book with id ${id} was not found!`,
      });
    }

    const bookBorrowed = await booksData.borrowBook(+id);
    if (!bookBorrowed) {
      res.json({
        msg: `Book has already been borrowed!`,
      });
    } else {
      res.status(200).send(theBook);
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** return a book by id
 *
 */ // да се провери да ли е всета от този потребител и да върна книгата
app.patch('/books/:id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  try {
    const book = await booksData.returnBook(+req.params.id);
    if (!book) {
      res.json({
        msg: `Book has already been returned!`,
      });
    } else {
      res.json({
        msg: 'Book successfully returned!',
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** read all reviews for a book
 *
 */
app.get('/books/:id/reviews', authMiddleware, loggedUserGuard, async (req, res) => {
  const {
    id,
  } = req.params;

  try {
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
      return res.status(404).json({
        msg: `Book with id ${id} was not found!`,
      });
    }

    const theReviews = await reviewsData.getReviewsForBook(+id);
    if (theReviews.length > 0) {
      res.send(theReviews);
    } else {
      return res.json({
        msg: 'Book has no reviews yet!',
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** create book review
 *
 */
app.post('/books/:books_id/reviews', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
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
});

/** update book review
 *
 */
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
      res.send({
        message: 'Review updated!', // return updated review
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** delete book review from user
 *
 */
app.delete('/reviews/:reviews_id', authMiddleware, loggedUserGuard, banGuard, async (req, res) => {
  try {
    const review = await reviewsData.getReviewById(req.params.reviews_id);
    if (!review || review.is_deleted === 1) {
      res.status(400).json({
        message: 'Review not found!',
      });
    }
    if (review.users_id !== req.user.user_id) {
      return res.status(403).json({
        message: 'You are not authorized to delete this review!',
      });
    }
    await reviewsData.deleteReview(req.params.reviews_id);

    res.status(200).json({
      message: `Review deleted`, // return deleted review
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** delete any review from admin
 *
 */
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

/** update any review form admin
 *
 */
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
      return res.status(200).json({
        message: 'Review updated!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// rate a book borrow return return book data
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
      return res.status(200).json({
        message: 'Rating is updated!',
      });
    }
    await booksRatingData.setRatingToBook(userId, bookId, rating);
    return res.status(200).json({
      message: 'Rating is given!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

/** like review
 *
 */
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
      const newLike = await reviewsLikeData.updateReviewLike(checkForLike.review_likes_id, reaction);
      return res.status(200).json({
        message: 'Like is updated!',
      });
    }
    const newLike = await reviewsLikeData.setLikeToReview(userId, reviewId, reaction);
    return res.status(200).json({
      message: 'Like is given!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

// read any book admin


/** ban user from admin
 *
 */
app.post('/admin/users/:id/ban', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    await usersData.banUser(+req.params.id);
    res.json({
      message: `User (${req.params.id}) banned!`,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** delete user from admin
 *
 */
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
      message: 'User was successful deleted!', // return user data
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** return user from admin
 *
 */
app.put('/admin/users/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const user = await usersData.getUserById(req.params.id);
    if (!user) {
      res.status(400).json({
        message: 'User not found!',
      });
    }

    await usersData.returnUser(user.users_id);
    res.status(200).json({
      message: 'User was successful returned!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

/** get all users from admin
 *
 */
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

/** read all review from admin
 *
 */
app.get('/admin/reviews', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
  try {
    const reviews = await reviewsData.getAllReviews();
    res.send(reviews);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
