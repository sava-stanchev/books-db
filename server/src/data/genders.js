import pool from './pool.js';

const getAllGenders = async () => {
  return await pool.query(`
    SELECT * FROM genders
  `);
};

export default {
  getAllGenders,
};
