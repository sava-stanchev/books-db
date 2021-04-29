import pool from './pool.js';

const getAllGenders = async () => {
  return await pool.query(`
    SELECT * FROM genders
  `);
};

const getAllLanguages = async () => {
  return await pool.query(`
    SELECT * FROM languages
  `);
};

const getAllGenres = async () => {
  return await pool.query(`
    SELECT * FROM genres
  `);
};

const getAllReactions = async () => {
  return await pool.query(`
    SELECT * FROM reactions
  `);
};

export default {
  getAllGenders,
  getAllLanguages,
  getAllGenres,
  getAllReactions,
};
