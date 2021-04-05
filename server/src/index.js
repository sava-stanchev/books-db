import '../load-env.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import authenticateToken from './middlewares/authenticate-token.js';

const PORT = 5555;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// register user
app.post('/users', (req, res) => {});
// login 
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } else {
        res.json({ msg: 'Username or password incorrect!' });
    }
});
// logout
app.post('/users', (req, res) => {});
// retrieve all books
app.get('/books', (req, res) => {
    const { title, sort } = req.query;
//  from ware are books?
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
// create new book - in admin 
app.post('/books', (req, res) => {});
// view individual book by id
app.get('/books/:id', (req, res) => {});

// borrow a book by id - patch vs post
app.post('/books/:id', (req, res) => {
    const theBook = books.find(b => b.id === +req.params.id && b.isDeleted !== true);
    if (!theBook) {
        return res.status(404).json({ msg: `Book with id ${req.params.id} was not found!` });
    }
    if (theBook.isBorrowed === false) {
        books.map(b => b.id === req.params.id ? { ...b, isBorrowed: true } : b);
    } else {
        return res.json({ msg: `Book has already been borrowed!`});
    }
    res.json({ msg: 'Book successfully borrowed!' });
});
// return a book by id
app.patch('/books/:id', (req, res) => {});
// read book all reviews
app.get('/books/:id/reviews', (req, res) => {
    const theBook = books.find(b => b.id === +req.params.id && b.isDeleted !== true);
    if (!theBook) {
        return res.status(404).json({ msg: `Book with id ${req.params.id} was not found!` });
    }
    if (theBook.reviews.length > 0) {
        res.send(theBook.reviews);
    } else {
        return res.json({ msg: 'Book has no reviews yet!' });
    }
})
// create book review
app.post('/book/:id/reviews', (req, res) => {});
// update book review
app.put('books/:id/reviews/:reviewid', (req, res) => {});
// delete book review
app.put('/books/:id/reviews/:reviewid', (req, res) => {});
// rete book



app.listen(PORT, () => console.log(`Listening on ${PORT}...`));