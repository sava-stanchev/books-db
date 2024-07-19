import pool from "./pool.js";

const addBookRating = async (bookId, userId) => {
  const sql = `
    INSERT INTO book_ratings (book_id, user_id) 
    VALUES (?, ?)
  `;
  await pool.query(sql, [bookId, userId]);
};

export default {
  addBookRating,
};
