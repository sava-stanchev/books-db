import pool from "./pool.js";

const addBookRating = async (bookId, userId, rating) => {
  const sql = `
    INSERT INTO book_ratings (book_id, user_id, rating) 
    VALUES (?, ?, ?)
  `;
  await pool.query(sql, [bookId, userId, rating]);
};

const hasUserRatedBook = async (userId, bookId) => {
  const sql = `
    SELECT rating
    FROM book_ratings
    WHERE user_id = ? AND book_id = ?
  `;

  const [result] = await pool.query(sql, [userId, bookId]);
  return result.length > 0 ? result[0] : null;
};

export default {
  addBookRating,
  hasUserRatedBook,
};
