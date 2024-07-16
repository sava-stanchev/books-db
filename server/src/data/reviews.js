import pool from "./pool.js";

const getReviewsForBook = async (id) => {
  const sql = `
    SELECT r.content, r.date_created, u.username, r.id, r.user_id
    FROM reviews AS r
        LEFT JOIN books AS b
        ON b.id = r.book_id
        LEFT JOIN users AS u
        ON u.id = r.user_id
        WHERE r.is_deleted != 1 and b.id = ?
        GROUP BY r.id
  `;
  const result = await pool.query(sql, [id]);
  return result[0];
};

const getReviewById = async (id) => {
  const sql = `
    SELECT * FROM reviews
    WHERE reviews.id = ?
  `;

  const result = await pool.query(sql, [id]);
  return result[0];
};

const createReview = async (bookId, content, userId) => {
  const sqlNewReview = `
    INSERT INTO reviews (user_id, book_id, date_created, is_deleted, content)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await pool.query(sqlNewReview, [
    userId,
    bookId,
    new Date(),
    0,
    content,
  ]);

  const sql = `
    SELECT content, date_created FROM reviews AS r
    WHERE r.id = ?
  `;

  const resultObject = JSON.parse(JSON.stringify(result));
  const createdReview = await pool.query(sql, [resultObject[0].insertId]);
  return createdReview[0][0];
};

const deleteReview = async (id) => {
  await pool.query(`UPDATE reviews AS r SET r.is_deleted = 1 WHERE r.id = ?`, [
    id,
  ]);
};

export default {
  getReviewsForBook,
  getReviewById,
  createReview,
  deleteReview,
};
