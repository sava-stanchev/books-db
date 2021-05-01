import pool from './pool.js';

export const tokenExists = async (token) => {
  const result = await pool.query('SELECT * FROM tokens AS t WHERE t.token = ?', [token]);

  return result && result.length > 0;
};


export const deleteToken = async (token) => {

};
// deleteToken - todo
