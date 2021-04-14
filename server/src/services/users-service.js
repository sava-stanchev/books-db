import serviceErrors from "./service-errors.js";
import bcrypt from 'bcrypt';
import pool from '../data/pool.js';


export const signInUser = async ({
    userName,
    password
}) => {

    const userData = await pool.query('SELECT * FROM users AS u WHERE u.user_name = ?', [userName]);
    if (userData.length === 0) {
        throw new Error('Username does not exist!');
    }

    if (await bcrypt.compare(password, userData[0].password)) {
        return userData[0];
    }

    return null;
};