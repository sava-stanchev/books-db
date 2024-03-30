import pool from "./pool.js";

const getAllBooks = async () => {
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1
  `);
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
    SELECT b.id, b.title, b.author, b.year, b.cover, l.language, g.genre, b.is_deleted
    FROM books AS b
    JOIN languages AS l
    ON b.language = l.id
    JOIN genres AS g
    ON b.genre = g.id
    WHERE b.is_deleted != 1 and b.id = ?
  `;

  const result = await pool.query(sql, [bookId, bookId]);
  return result;
};

const deleteBook = async (id) => {
  const sql = `
    UPDATE books SET books.is_deleted = 1
    WHERE books.id = ?
  `;
  return await pool.query(sql, [id]);
};

const getAnyBookById = async (id) => {
  const sql = `
    SELECT * FROM books AS b
    WHERE b.id = ?
  `;
  const result = await pool.query(sql, [id]);
  return result;
};

const bookAverageRating = async (id) => {
  const sql = `
  SELECT br.books_id, b.title, ROUND(AVG(r.rating)) AS avg_rating
  FROM books_ratings AS br
  JOIN books AS b ON br.books_id = b.books_id
  JOIN ratings AS r ON br.ratings_id = r.ratings_id
  WHERE br.books_id = ?
  `;
  const result = await pool.query(sql, [id]);
  return result[0];
};

export default {
  getAllBooks,
  sortBooksByYear,
  getBookById,
  deleteBook,
  getAnyBookById,
  bookAverageRating,
};
