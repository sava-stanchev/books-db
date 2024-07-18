import pool from "./pool.js";

const getAllUsers = async () => {
  return await pool.query(`
    SELECT * FROM users
    WHERE users.is_deleted = 0
  `);
};

const getUserBy = async (column, value) => {
  const sql = `
    SELECT u.id, u.username, u.password, u.email, u.is_admin FROM users AS u
    WHERE u.${column} = ?
    AND u.is_deleted = 0
  `;
  const result = await pool.query(sql, [value]);
  return result[0][0];
};

const createUser = async (user) => {
  const sqlNewUser = `
    INSERT INTO users (username, password, email, is_admin, is_deleted) 
    VALUES (?, ?, ?, 0, 0)
  `;
  const result = await pool.query(sqlNewUser, [
    user.username,
    user.password,
    user.email,
  ]);

  const sql = `
    SELECT u.username, u.email
    FROM users AS u
    WHERE u.id = ?
  `;

  const createdUser = (await pool.query(sql, [result.insertId]))[0];
  return createdUser;
};

const getUserById = async (id) => {
  const sql = `
    SELECT u.id, u.username, u.email, u.is_admin, u.is_deleted FROM users AS u
    WHERE u.id = ?
  `;
  const result = await pool.query(sql, [id]);
  return result[0];
};

const deleteUser = async (id) => {
  const sql = `
    UPDATE users SET users.is_deleted = 1
    WHERE users.id = ?
  `;
  await pool.query(sql, [id]);
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getUserBy,
};
