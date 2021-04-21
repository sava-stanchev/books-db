import pool from './pool.js';

const getBookRatingByUser = async (bookId, userId) => {
  const sql = `
        SELECT * FROM books_ratings AS br
        WHERE br.books_id = ? AND br.users_id = ?
    `;

  const result = await pool.query(sql, [bookId, userId]);
  return result[0];
};

const setRatingToBook = async (userId, bookId, rating) => {
  const newRatingSql = `
    INSERT INTO books_ratings (users_id, books_id, ratings_id, is_deleted)
    VALUES (?, ?, ?, 0)
  `;
  const result = await pool.query(newRatingSql, [userId, bookId, rating]);

  const sql = `
        SELECT * FROM books_ratings AS br
        WHERE br.book_ratings_id = ?
    `;

  const newRating = (await pool.query(sql, result.insertId))[0];

  return newRating;
};

const updateBookRating = async (bookRatingsId, rating) => {
  const sql = `
    UPDATE books_ratings AS br 
    SET br.ratings_id = ?
    WHERE br.book_ratings_id = ?
  `;

  const result = await pool.query(sql, [rating, bookRatingsId]);
  return result;
};

export default {
  getBookRatingByUser,
  setRatingToBook,
  updateBookRating,
};
