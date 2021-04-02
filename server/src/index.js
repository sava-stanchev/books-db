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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } else {
        res.send('Username or password incorrect!');
    }
});

app.get('/books', (req, res) => {
    const { title, sort } = req.query;
    let availableBooks = books.filter(b => b.isBorrowed === false && b.isDeleted === false);
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
        let filterBooks = availableBooks.slice(0);
        res.json(filterBooks.filter(b => b.title.includes(title)));
    } else {
        res.json(availableBooks);
    }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));