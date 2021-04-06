import '../load-env.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import authenticateToken from './middlewares/authenticate-token.js';
import {
    createBook,
    getBookById
} from './data/books.js';
import bookCreateValidator from './validators/book-create-validator.js';
import bookUpdateValidator from './validators/book-update-validator.js'
import validateBody from './middlewares/validate-body.js';

const PORT = 5555;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// register user - SPH
app.post('/users', (req, res) => {});

// login 
app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const accessToken = jwt.sign({
            username: user.username
        }, process.env.ACCESS_TOKEN_SECRET);
        res.json({
            accessToken: accessToken
        });
    } else {
        res.json({
            msg: 'Username or password incorrect!'
        });
    }
});

// logout - SPH
app.post('/users', (req, res) => {});

// retrieve all books
app.get('/books', (req, res) => {
    const {
        title,
        sort
    } = req.query;
    let availableBooks = books.filter(b => b.isBorrowed === false && b.isDeleted === false);
    // 
    if (sort) {
        availableBooks = availableBooks.sort((a, b) => {
            if (sort === 'year_asc') {
                return a.year - b.year;
            } else if (sort === 'year_desc') {
                return b.year - a.year;
            } else {
                return;
            }
        })
    }
    if (title) {
        let getBooksByTitle = availableBooks.slice();
        res.json(getBooksByTitle.filter(b => b.title.includes(title)));
    } else {
        res.json(availableBooks);
    }
});

// create new book - in admin  SPH
app.post('/admin/books', validateBody('book', bookCreateValidator), (req, res) => {
    const book = createBook(req.body, 'user');

    res.json(book);
});

// view individual book by id - SPH
app.get('/books/:id', validateBody('book', bookUpdateValidator), (req, res) => {
    res.json(getBookById(+req.params.id))
});

// borrow a book by id - patch vs post
app.post('/books/:id', (req, res) => {
    const theBook = books.find(b => b.id === +req.params.id && b.isDeleted !== true);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${req.params.id} was not found!`
        });
    }
    if (theBook.isBorrowed === false) {
        books.map(b => b.id === req.params.id ? {
            ...b,
            isBorrowed: true
        } : b);
    } else {
        return res.json({
            msg: `Book has already been borrowed!`
        });
    }
    res.json({
        msg: 'Book successfully borrowed!'
    });
});

// return a book by id - SPH
app.patch('/books/:id', (req, res) => {});

// read all book reviews
app.get('/books/:id/reviews', (req, res) => {
    const theBook = books.find(b => b.id === +req.params.id && b.isDeleted !== true);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${req.params.id} was not found!`
        });
    }
    if (theBook.reviews.length > 0) {
        res.send(theBook.reviews);
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
app.put('/books/:id/reviews/:reviewId', (req, res) => {
    const theBook = books.find(b => b.id === +req.params.id && b.isDeleted !== true);
    if (!theBook) {
        return res.status(404).json({
            msg: `Book with id ${req.params.id} was not found!`
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

// update any book 
app.post('/admin/books/:id', (req, res) => {
    
    res.json({
        message: `Book updated`,
    });
});

//delete any book 
app.delete('/admin/books/:id', (req, res) => {
    
    res.json({
        message: `Book deleted`,
    });
})

// ban user 

// delete user - SPH

// read review 


app.listen(PORT, () => console.log(`Listening on ${PORT}...`));