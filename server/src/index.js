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
    const user = users.find(u => { return u.username === username && u.password === password });
    if (user) {
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } else {
        res.send('Username or password incorrect!');
    }
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));