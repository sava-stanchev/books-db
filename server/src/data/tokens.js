import pool from "./pool.js";

const addToken = async (token) => {
  const sql = `INSERT INTO tokens (token) VALUES (?)`;
  await pool.query(sql, [token]);
};

const getToken = async (token) => {
  const sql = `
    SELECT * FROM tokens
    WHERE tokens.token = ?
  `;

  const result = await pool.query(sql, [token]);
  return result[0][0].token;
};

const removeToken = async (token) => {
  const sql = `
    DELETE FROM tokens
    WHERE tokens.token = ?
  `;
  await pool.query(sql, [token]);
};

export default {
  addToken,
  getToken,
  removeToken,
};
