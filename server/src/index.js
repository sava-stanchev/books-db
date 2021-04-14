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
    logoutUser
} from './data/users.js';
import {
    authMiddleware
} from './auth/auth-middleware.js';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import loggedUserGuard from './middlewares/loggedUserGuard.js';
import roleAuth from './middlewares/role-auth.js';
import {
    userRole
} from './common/user-role.js'
import banGuard from './middlewares/ban-guard.js';
import pool from './data/pool.js';

const config = dotenv.config().parsed;

const PORT = config.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

// register user - work
app.post('/users', loggedUserGuard, async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await usersData.createUser(user);
    if (newUser.error) {
        return res.status(400).json(newUser.response);
    }

    res.json(newUser.response);

});

// login  - work
app.post('/login', async (req, res) => {
    try {
        const user = await usersData.validateUser(req.body);
        if (user) {
            const token = createToken({
                users_id: user.users_id,
                user_name: user.user_name,
                is_admin: user.is_admin
            })
            res.json({
                token
            });
        } else {
            res.status(401).json({
                error: 'Invalid credentials!'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// logout - work
app.delete('/logout', authMiddleware, async (req, res) => {
    await logoutUser(req.headers.authorization.replace('Bearer ', ''));

    res.json({
        message: 'Successfully logged out!'
    });
});

// retrieve all books - work
app.get('/books', authMiddleware, loggedUserGuard, async (req, res) => {
    const {
        title,
        sort
    } = req.query;
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
});

// create new book - in admin  - work to check validator
app.post('/admin/books', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookCreateValidator), async (req, res) => {
    console.log(req.user);
    const book = await booksData.createBook(req.body, req.user);

    res.json(book);
});

// view individual book by id - work
app.get('/books/:id', authMiddleware, loggedUserGuard, async (req, res) => {
    res.json(await booksData.getBookById(+req.params.id))
});

// update any book as admin
app.put('/admin/books/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), validateBody('book', bookUpdateValidator), async (req, res) => {
    const {
        id
    } = req.params;
    const updateData = req.body;
    const updatedBook = await booksService.updateBook(+id, updateData);

    if (!updatedBook) {
        res.status(404).send({
            message: 'Book not found!'
        });
    } else {
        res.send({
            message: 'Book updated!'
        });
    }
});

// delete any book as admin
app.delete('/admin/books/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
    await booksData.deleteBook(+req.params.id);
    res.json({
        message: `Book deleted`,
    });
});

// borrow a book by id - working
app.post('/books/:id', authMiddleware, loggedUserGuard, async (req, res) => {
    const {
        id
    } = req.params;
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${id} was not found!`
        });
    }
    const bookBorrowed = await booksData.borrowBook(+id);
    if (!bookBorrowed) {
        res.json({
            msg: `Book has already been borrowed!`
        });
    } else {
        res.json({
            msg: 'Book successfully borrowed!'
        });
    }
});

// return a book by id - work
app.patch('/books/:id', authMiddleware, loggedUserGuard, async (req, res) => {
    const book = await booksData.returnBook(+req.params.id);
    if (!book) {
        res.json({
            msg: `Book has already been returned!`
        });
    } else {
        res.json({
            msg: 'Book successfully returned!'
        });
    }
});

// read all reviews for a book - working
app.get('/books/:id/reviews', authMiddleware, loggedUserGuard, async (req, res) => {
    const {
        id
    } = req.params;
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${id} was not found!`
        });
    }
    const theReviews = await reviewsData.getReviewsForBook(+id);
    if (theReviews.length > 0) {
        res.send(theReviews);
    } else {
        return res.json({
            msg: 'Book has no reviews yet!'
        });
    }
});

// create book review - works to change
app.post('/reviews', authMiddleware, loggedUserGuard, async (req, res) => {
    const a = req.body.books_id;
    const book = await booksData.getBookById(+req.body.books_id);
    if (!book[0]) {
        res.status(404).json({
            msg: `Book was not found!`
        });
    }

    const review = await reviewsData.createReview(req.body);

    res.status(200).json(review);

});

// update book review
app.put('/books/:id/reviews/:reviewId', authMiddleware, loggedUserGuard, async (req, res) => {
    const {
        id
    } = req.params;
    const theBook = await booksData.getBookById(+id);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${id} was not found!`
        });
    }
    const newText = req.body.text;
    const findReviewId = +req.params.reviewId;
    theBook.reviews.map(r => r.reviewId === findReviewId ? {
        ...r,
        text: newText
    } : r);
    res.json({
        msg: 'Review successfully updated!'
    });
});

// delete book review - work
app.delete('/reviews/:reviews_id', authMiddleware, loggedUserGuard, async (req, res) => {

    const review = await reviewsData.getReviewById(req.params.reviews_id);
    if (!review || review.is_deleted === 1) {
        res.status(400).json({
            message: 'Review not found!'
        });
    }
    if (review.users_id !== req.user.user_id) {
        return res.status(403).json({
            message: 'You are not authorized to delete this review!'
        })
    }
    await reviewsData.deleteReview(req.params.reviews_id);

    res.status(200).json({
        message: `Review deleted`,
    });
});

// delete any review from admin - work
app.delete('/admin/reviews/:reviews_id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
    console.log('++++++++++');
    const review = await reviewsData.getReviewById(req.params.reviews_id);
    if (!review || review.is_deleted === 1) {
        res.status(400).json({
            message: 'Review not found!'
        });
    }
    await reviewsData.deleteReview(req.params.reviews_id);

    res.status(200).json({
        message: `Review deleted`,
    });
});

// rate book

// like reviews - SPH

// read any book admin 



// ban user 
app.post('/admin/users/:id/ban', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
    await usersData.banUser(+req.params.id);
    res.json({
        message: `User (${req.params.id}) banned!`
    });
});

// delete user - work
app.delete('/admin/users/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
    try {
        const user = await usersData.getUserById(req.params.id);

        if (!user || user.is_deleted) {
            res.status(400).json({
                message: 'User not found or already was deleted!'
            });
        }

        await usersData.deleteUser(user.users_id);
        res.status(200).json({
            message: 'User was successful deleted!'
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// return user - work
app.put('/admin/users/:id', authMiddleware, loggedUserGuard, roleAuth(userRole.Admin), async (req, res) => {
    try {
        const user = await usersData.getUserById(req.params.id);
        if (!user) {
            res.status(400).json({
                message: 'User not found!'
            });
        }

        await usersData.returnUser(user.users_id);
        res.status(200).json({
            message: 'User was successful returned!'
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }


})

// get all users - work
app.get('/admin/users', authMiddleware, loggedUserGuard, async (req, res) => {
    const users = await usersData.getAllUsers();
    res.json(users);
})

// read reviews as admin
app.get('/admin/reviews', authMiddleware, loggedUserGuard, async (req, res) => {
    const reviews = await reviewsData.getAllReviews();

    res.send(reviews)
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));