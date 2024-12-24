import pool from "./pool.js";

const getReviewsForBook = async (id) => {
  const sql = `
    SELECT r.content, r.date_created, u.username, r.id, r.user_id
    FROM reviews AS r
    LEFT JOIN books AS b ON b.id = r.book_id
    LEFT JOIN users AS u ON u.id = r.user_id
    WHERE r.is_deleted != 1 AND b.id = ?
    GROUP BY r.id
  `;

  const [result] = await pool.query(sql, [id]);
  return result;
};

const getReviewById = async (id) => {
  const sql = `SELECT * FROM reviews WHERE id = ?`;

  const [result] = await pool.query(sql, [id]);
  return result;
};

const createReview = async (bookId, content, userId) => {
  const sqlNewReview = `
    INSERT INTO reviews (user_id, book_id, date_created, is_deleted, content)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sqlNewReview, [
    userId,
    bookId,
    new Date(),
    0,
    content,
  ]);

  const sql = `
    SELECT content, date_created FROM reviews WHERE id = ?
  `;

  const [createdReview] = await pool.query(sql, [result.insertId]);
  return createdReview[0];
};

const editReview = async (id, content) => {
  const sql = `UPDATE reviews SET content = ? WHERE id = ?`;
  const [result] = await pool.query(sql, [content, id]);
  return result.affectedRows > 0;
};

const deleteReview = async (id) => {
  const sql = `UPDATE reviews SET is_deleted = 1 WHERE id = ?`;
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
};

export default {
  getReviewsForBook,
  getReviewById,
  createReview,
  editReview,
  deleteReview,
};
