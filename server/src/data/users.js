import pool from './pool.js';
import bcrypt from 'bcrypt';

const getAllUsers = async () => {
  return await pool.query(`
    SELECT * FROM users AS u
    WHERE u.is_deleted != 1
    `);
};

const createUser = async (user) => {
    const userExist = await pool.query(
      `SELECT * FROM users AS u WHERE u.user_name = ?`
      , [user.user_name]);

  if (userExist[0]) {
    return {
      error: true,
      response: {
        error: 'username should be unique!',
      },
    };
  }

  const sqlNewUser = `
    INSERT INTO users (user_name, password, first_name, last_name, user_age, e_mail, is_admin, is_deleted, is_banned, gender) 
    VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, ?)
    `;
  const result = await pool.query(sqlNewUser, [user.user_name, user.password, user.first_name, user.last_name, user.user_age, user.e_mail, user.gender]);

  const sql = `SELECT u.user_name, u.first_name, u.last_name, e_mail
                FROM users AS u
                WHERE u.users_id = ?
    `;

  const createdUser = (await pool.query(sql, [result.insertId]))[0];

  return {
    success: true,
    response: createdUser,
  };
};

const validateUser = async ({ userName, password }) => {
  const userData = await pool.query('SELECT * FROM users u WHERE u.user_name = ?', [userName]);

  if (userData.length === 0) {
    throw new Error('Username does not exist!');
  }

  if (await bcrypt.compare(password, userData[0].password)) {
    return userData[0];
  }

  return null;
};

const banUser = async (id) => {
  const result = await pool.query(`SELECT * FROM users u WHERE u.users_id = ?`, [id]);

  if (result && result[0]) {
    await pool.query(`UPDATE users u SET u.ban_date = ? WHERE u.users_id = ?`, [new Date(Date.now() + 10 * 24 * 3600 * 1000), id]);
  }
};

const liftBan = async (id) => {
  await pool.query(`UPDATE users u SET u.ban_date = NULL WHERE u.users_id = ?`, [id]);
};

const getUserById = async (id) => (await pool.query('SELECT * FROM users AS u WHERE u.users_id = ?', [id]))[0];

export const logoutUser = async (token) => {
  return await pool.query('INSERT INTO tokens (token) VALUES (?)', [token]);
};

const deleteUser = async (id) => {
  await pool.query(`UPDATE users AS u SET u.is_deleted = 1 WHERE u.users_id = ?`, [id]);
};

const returnUser = async (id) => {
  await pool.query(`UPDATE users AS u SET u.is_deleted = 0 WHERE u.users_id = ?`, [id]);
};

export default {
  createUser,
  getAllUsers,
  validateUser,
  banUser,
  liftBan,
  getUserById,
  deleteUser,
  returnUser,
};
