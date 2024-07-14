import pool from "./pool.js";

const getAllReviews = async () => {
  return await pool.query(`
    SELECT r.reviews_id, r.content, r.date_created, b.title, u.username
    FROM reviews AS r
    JOIN users AS u ON r.users_id = u.users_id
    JOIN books AS b ON r.books_id = b.books_id
    WHERE r.is_deleted != 1
  `);
};

const getAllReviewForUser = async (userId) => {
  const sql = `
    SELECT r.reviews_id, r.content, r.date_created, b.title, u.username
    FROM reviews AS r
    JOIN users AS u ON r.users_id = u.users_id
    JOIN books AS b ON r.books_id = b.books_id
    WHERE r.is_deleted != 1 and r.users_id = ?
  `;
  const result = await pool.query(sql, [userId]);
  return result;
};

const getReviewsForBook = async (id) => {
  const sql = `
    SELECT r.content, r.date_created, u.username, r.reviews_id, r.users_id
    FROM reviews AS r
        LEFT JOIN books AS b
        ON b.books_id = r.books_id
        LEFT JOIN users AS u
        ON u.users_id = r.users_id
        WHERE r.is_deleted != 1 AND b.books_id = ?
        GROUP BY r.reviews_id
  `;
  const result = await pool.query(sql, [id]);
  return result;
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

const createReview = async (bookId, content, userId) => {
  const sqlNewReview = `
    INSERT INTO reviews (user_id, book_id, date_created, content)
    VALUES (?, ?, ?, ?)
  `;
  const result = await pool.query(sqlNewReview, [
    userId,
    bookId,
    new Date(),
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
  await pool.query(
    `UPDATE reviews AS r SET r.is_deleted = 1 WHERE r.reviews_id = ?`,
    [id]
  );
};

const userReviewByBookId = async (userId, bookId) => {
  const sql = `
  SELECT * FROM reviews AS r
  WHERE r.users_id = ? AND r.books_id = ? AND r.is_deleted != 1
  `;
  const result = await pool.query(sql, [userId, bookId]);
  return result;
};

const getAnyReviewById = async (id) => {
  const sql = `
  SELECT r.reviews_id, r.content, r.date_created, b.title, u.username
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
  createReview,
  deleteReview,
  userReviewByBookId,
  getReviewByIdForUser,
  getAnyReviewById,
  getAllReviewForUser,
};
