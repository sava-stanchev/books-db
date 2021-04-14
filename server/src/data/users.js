import pool from './pool.js';
import bcrypt from 'bcrypt';

const getAllUsers = async () => {
    return await pool.query(`
      SELECT * FROM users AS u
      WHERE u.is_deleted != 1
    `);
};

const createUser = async (user) => {
    
    const userExist = await pool.query(`SELECT * FROM users AS u WHERE u.user_name = ?`, [user.userName]);
    if (userExist[0]) {
        return {
            error: true,
            response: {
                error: 'username should be unique!'
            }
        }
    }
    // console.log('HI HI HI');
    const sqlNewUser = `
    INSERT INTO users (user_name, password, first_name, last_name, user_age, e_mail, is_admin, is_deleted, is_banned, gender) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await pool.query(sqlNewUser, [user.userName, user.password, user.firstName, user.lastName, user.userAge, user.e_mail, user.is_admin, user.is_deleted, user.is_banned, user.gender]);

    const sql = `SELECT u.user_name, u.first_name, u.last_name
                FROM users AS u
                WHERE u.users_id = ?
    `;

    const createdUser = (await pool.query(sql, [result.insertId]))[0];

    return{
        success: true,
        response: createdUser,
    }
}

const validateUser = async({ userName, password }) => {
    const userData = await pool.query('SELECT * FROM users u WHERE u.user_name = ?', [userName]);
    
    if(userData.length === 0) {
        throw new Error('Username does not exist!');
    }

    if (await bcrypt.compare(password, userData[0].password)) {
        return userData[0];
    }

    return null;
};

export default {
    createUser,
    getAllUsers,
    validateUser
}