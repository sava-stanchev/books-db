import pool from "./pool.js";

const getAllUsers = async () => {
  const sql = `
    SELECT * FROM users
    WHERE is_deleted = 0
  `;

  const result = await pool.query(sql);
  return result;
};

const getUserBy = async (column, value) => {
  const sql = `
    SELECT id, username, password, email, is_admin  
    FROM users
    WHERE ${pool.escapeId(column)} = ?
    AND is_deleted = 0
  `;

  const [result] = await pool.query(sql, [value]);
  return result[0];
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
    SELECT username, email
    FROM users
    WHERE id = ?
  `;

  const [createdUser] = await pool.query(sql, [result.insertId]);
  return createdUser[0] || null;
};

const deleteUser = async (id) => {
  const sql = `
    UPDATE users 
    SET is_deleted = 1
    WHERE id = ?
  `;

  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
};

export default {
  createUser,
  getAllUsers,
  deleteUser,
  getUserBy,
};
