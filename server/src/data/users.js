import pool from './pool.js';

const getAllUsers = async () => {
  return await pool.query(`
    SELECT * FROM users AS u
  `);
};

const getUserByName = async (userName) => {
  const result = await pool.query(
      `SELECT * FROM users AS u WHERE u.user_name = ?`
      , [userName]);
  return result;
};

const getUserBy = async (column, value) => {
  const sql = `
    SELECT u.users_id, u.username, u.password, u.email, u.is_admin FROM users AS u
    WHERE u.${column} = ?
    AND u.is_deleted = 0
  `;
  const result = await pool.query(sql, [value]);
  return result[0];
};

const createUser = async (user) => {
  const sqlNewUser = `
    INSERT INTO users (username, password, first_name, last_name, email, is_admin, is_deleted, ban_date, user_age, gender) 
    VALUES (?, ?, ?, ?, ?, 0, 0, DEFAULT, ?, ?)
  `;
  const result = await pool.query(sqlNewUser,
      [user.username, user.password, user.first_name, user.last_name, user.email, user.user_age, user.gender]);

  const sql = `
    SELECT u.username, u.first_name, u.last_name, u.email, u.user_age, u.gender
    FROM users AS u
    WHERE u.users_id = ?
  `;

  const createdUser = (await pool.query(sql, [result.insertId]))[0];
  return createdUser;
};

const banUser = async (id) => {
  const result = await pool.query(`SELECT * FROM users u WHERE u.users_id = ?`, [id]);

  if (result && result[0]) {
    await pool.query(`UPDATE users u SET u.ban_date = ? WHERE u.users_id = ?`, [new Date(Date.now() + 10 * 24 * 3600 * 1000), id]);
  }
};

const updateUser = async (user) => {
  let ban_date = '';
  if (user.ban_date === null) {
    ban_date = null;
  } else {
    ban_date = user.ban_date.slice(0, 10);
  }
  const sql = `
    UPDATE users AS u
    SET u.username = ?, u.password = ?, u.first_name = ?, u.last_name =?, u.user_age = ?, u.email = ?, is_admin = ?, u.is_deleted = ?, u.ban_date = ?, u.gender = ?
    WHERE u.users_id = ?
  `;
  await pool.query(sql, [user.username, user.password, user.first_name, user.last_name, user.user_age, user.email, user.is_admin, user.is_deleted, ban_date, user.gender, user.users_id]);
  return await getUserById(user.users_id);
};

const liftBan = async (id) => {
  await pool.query(`UPDATE users u SET u.ban_date = NULL WHERE u.users_id = ?`, [id]);
};

const getUserById = async (id) => {
  const sql = `
  SELECT u.users_id, u.user_name, u.first_name, u.last_name, u.user_age
    , u.e_mail, u.is_admin, u.is_deleted, u.ban_date, g.gender FROM users AS u
    JOIN genders AS g ON u.gender = g.genders_id
    WHERE u.users_id = ?
  `;
  const result = await pool.query(sql, [id]);
  return result[0];
};

const logoutUser = async (token) => {
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
  getUserByName,
  banUser,
  liftBan,
  getUserById,
  deleteUser,
  returnUser,
  logoutUser,
  updateUser,
  getUserBy,
};
