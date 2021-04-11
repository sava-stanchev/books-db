import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const config = dotenv.config().parsed;

const createToken = (payload) => {
    const token = jwt.sign(
        payload,
        config.PRIVATE_KEY,
        { expiresIn: config.TOKEN_LIFETIME }
    );

    return token;
};

export default createToken;
