import pool from './pool.js';

const getAllReviews = async () => {
  return await pool.query(`
    SELECT r.reviews_id, r.content, r.date_created, b.title, u.user_name
    FROM reviews AS r
    JOIN users AS u ON r.users_id = u.users_id
    JOIN books AS b ON r.books_id = b.books_id
    WHERE r.is_deleted != 1
  `);
};

const getReviewsForBook = async (id) => {
  const sql = `
  SELECT content FROM books AS b
  JOIN reviews AS r
    ON b.books_id = r.books_id
    WHERE b.is_deleted != 1 AND b.books_id = ?
  `;
  const result = await pool.query(sql, [id]);
  return result[0];
};

const getReviewById = async (id) => {
  const sql = `
    SELECT * FROM reviews AS r
    WHERE r.reviews_id = ?
  `;

  const result = await pool.query(sql, [id]);
  return result[0];
};

const getReviewByIdForUser = async (id) => {
  const sql = `
    SELECT content, date_created FROM reviews AS r
    WHERE r.reviews_id = ?
  `;

  const result = await pool.query(sql, [id]);
  return result[0];
};

const updateReviewSQL = async (review) => {
  const {reviews_id, content} = review;

  const sql = `
      UPDATE reviews AS r SET
      r.content = ?
      WHERE r.reviews_id = ?
  `;

  return await pool.query(sql, [content, reviews_id]);
};

const createReview = async (bookId, content, userId) => {
  const sqlNewReview = `
  INSERT INTO reviews (users_id, books_id, date_created, is_deleted, content)
  VALUES (?, ?, ? , ?, ?)
  `;
  const result = await pool.query(sqlNewReview, [userId, bookId, new Date(), 0, content]);
  const sql = `SELECT content, date_created FROM reviews AS r
              WHERE r.reviews_id = ?
`;
  const createdReview = (await pool.query(sql, [result.insertId]))[0];
  return createdReview;
};

const deleteReview = async (id) => {
  await pool.query(`UPDATE reviews AS r SET r.is_deleted = 1 WHERE r.reviews_id = ?`, [id]);
};

const userReviewByBookId = async (userId, bookId) => {
  const sql = `
  SELECT * FROM reviews AS r
  WHERE r.users_id = ? AND r.books_id = ?
  `;
  const result = await pool.query(sql, [userId, bookId]);
  return result;
};

const getAnyReviewById = async (id) => {
  const sql = `
  SELECT r.reviews_id, r.content, r.date_created, b.title, u.user_name
  FROM reviews AS r
  JOIN users AS u ON r.users_id = u.users_id
  JOIN books AS b ON r.books_id = b.books_id
  WHERE r.is_deleted != 1 AND r.reviews_id = ?
  `;
  const result = await pool.query(sql, [id]);
  return result;
};

export default {
  getAllReviews,
  getReviewsForBook,
  getReviewById,
  updateReviewSQL,
  createReview,
  deleteReview,
  userReviewByBookId,
  getReviewByIdForUser,
  getAnyReviewById,
};
