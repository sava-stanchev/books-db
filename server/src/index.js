import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {
    borrowBook,
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    searchBooksByTitle,
    sortBooksByYear,
    updateBook
} from './data/books.js';
import bookCreateValidator from './validators/book-create-validator.js';
import bookUpdateValidator from './validators/book-update-validator.js'
import validateBody from './middlewares/validate-body.js';
import transformBody from './middlewares/transform-body.js';
import dotenv from 'dotenv';
import { getAllReviews, getReviewsForBook } from './data/reviews.js';
import createToken from './auth/create-token.js';
import serviceErrors from './services/service-errors.js';
import { signInUser } from './services/users-service.js';

const config = dotenv.config().parsed;

const PORT = config.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// register user - SPH
app.post('/users', (req, res) => {});

// login 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { error, user } = await signInUser(usersData)(username, password);
    
    if (error === serviceErrors.INVALID_SIGNIN) {
        res.status(400).send({
            message: 'Invalid username/password'
        })
    } else {
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };
        const token = createToken(payload);

        res.status(200).send({
            token: token
        });
    }
});

// logout - SPH
app.post('/users', (req, res) => {});

// retrieve all books
app.get('/books', async (req, res) => {
    const { title, sort } = req.query;
    if (sort) {
        const theBooksSortedByYear = await sortBooksByYear(sort);
        return res.json(theBooksSortedByYear);
    }
    if (title) {
        const theBooksFoundByTitle = await searchBooksByTitle(title);
        return res.json(theBooksFoundByTitle);
    }
    const theBooks = await getAllBooks();
    res.json(theBooks);
});

// create new book - in admin  SPH - ready
app.post('/admin/books', validateBody('book', bookCreateValidator), (req, res) => {
    const book = createBook(req.body, 'user');

    res.json(book);
});

// view individual book by id - SPH - ready
app.get('/books/:id', (req, res) => {
    res.json(getBookById(+req.params.id))
});

// borrow a book by id - patch vs post
app.post('/books/:id', async (req, res) => {
    const { id } = req.params;
    const theBook = await getBookById(+id);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${id} was not found!`
        });
    }
    const bookBorrowed = await borrowBook(+id);
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

// return a book by id - SPH
app.patch('/books/:id', (req, res) => {
    const book = updateBook(req.params.id, updateBook);
    res.json(book);
});

// read all reviews for a book
app.get('/books/:id/reviews', async (req, res) => {
    const { id } = req.params;
    const theBook = await getBookById(+id);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${id} was not found!`
        });
    }
    const theReviews = await getReviewsForBook(+id);
    if (theReviews.length > 0) {
        res.send(theReviews);
    } else {
        return res.json({
            msg: 'Book has no reviews yet!'
        });
    }
})

// create book review - SPH
app.post('/book/:id/reviews', (req, res) => {

});

// update book review
app.put('/books/:id/reviews/:reviewId', async (req, res) => {
    const { id } = req.params;
    const theBook = await getBookById(+id);
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

// delete book review - SPH
app.delete('/books/:id/reviews/:reviewId', (req, res) => {

    res.json({
        message: `Review deleted`,
    });
});

// rate book

// like reviews - SPH

// read any book

// update any book as admin
app.put('/admin/books/:id', validateBody('book', bookUpdateValidator), async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBook = await updateBook(+id, updateData);

    if (!updatedBook) {
        res.status(404).send({ message: 'Book not found!' });
    } else {
        res.send({ message: 'Book updated!' });
    }
});

// delete any book as admin
app.delete('/admin/books/:id', async (req, res) => {
    await deleteBook(+req.params.id);
    res.json({
      message: `Book deleted`,
    });  
});

// ban user 
app.put('/admin/users/:id/banstatus', async (req, res) => {});

// delete user - SPH

// read reviews as admin
app.get('/admin/reviews', async (req, res) => {
    const reviews = await getAllReviews();

    res.send(reviews)
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));