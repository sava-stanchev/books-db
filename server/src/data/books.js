import pool from "./pool.js";

const getAllBooks = async () => {
  const result = await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1
  `);
  return result[0];
};

const sortBooksByYear = async (sort) => {
  if (sort === "year_asc") {
    return await pool.query(`
      SELECT * FROM books b
      WHERE b.is_deleted != 1
      ORDER BY b.year
    `);
  }

  if (sort === "year_desc") {
    return await pool.query(`
      SELECT * FROM books b
      WHERE b.is_deleted != 1
      ORDER BY b.year DESC
    `);
  }
};

const getBookById = async (bookId) => {
  const sql = `
    SELECT b.id, b.title, b.author, b.year, b.cover, b.description, l.language, g.genre, b.avg_rating , b.is_deleted
    FROM books AS b
    JOIN languages AS l
    ON b.language = l.id
    JOIN genres AS g
    ON b.genre = g.id
    WHERE b.is_deleted != 1 and b.id = ?
  `;

  const result = await pool.query(sql, [bookId, bookId]);
  return result[0];
};

const deleteBook = async (id) => {
  const sql = `
    UPDATE books SET books.is_deleted = 1
    WHERE books.id = ?
  `;
  return await pool.query(sql, [id]);
};

const updateBookRating = async (bookId, rating) => {
  await pool.query(`
    UPDATE books AS b
    SET b.avg_rating = ${rating}/(b.num_ratings+1) + b.avg_rating*(b.num_ratings/(b.num_ratings+1)),
    b.num_ratings = b.num_ratings + 1
    WHERE b.id = ${bookId}
  `);
};

export default {
  getAllBooks,
  sortBooksByYear,
  getBookById,
  deleteBook,
  updateBookRating,
};
