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
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));