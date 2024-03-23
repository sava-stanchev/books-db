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

const getBookByIdForUpdate = async (id) => {
  const sql = `
  SELECT b.title, b.author, b.genre, b.year, b.language
  FROM books AS b
  WHERE b.is_deleted != 1 AND b.id = ?
`;
  const result = await pool.query(sql, [id]);

  return result[0];
};

const updateBookSQL = async (book) => {
  const { id, title, author, genre, year, language } = book;

  const sql = `
    UPDATE books AS b SET
      b.title = ?,
      b.author = ?,
      b.genre = ?,
      b.year = ?,
      b.language = ?,
    WHERE b.id = ?
  `;

  return await pool.query(sql, [title, author, genre, year, language, id]);
};

const createBook = async (book, user) => {
  const { title, author, genre, year, language } = book;

  const { id } = user;

  const sqlNewBook = `
      INSERT INTO books (title, author, genre, year, language, is_deleted)
      VALUES (?, ?, ?, ?, ?, 0)
  `;
  const result = await pool.query(sqlNewBook, [
    title,
    author,
    +genre,
    year,
    +language,
    id,
  ]);

  const sql = `SELECT * FROM books AS b WHERE b.id = ?`;
  const createdBook = (await pool.query(sql, [result.insertId]))[0];

  return {
    success: true,
    response: createdBook,
  };
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

const uploadFile = async (bookId, fileName) => {
  const sql = `UPDATE books AS b SET b.cover = ? WHERE b.id = ?`;
  const result = await pool.query(sql, [fileName, bookId]);

  return {
    success: result.affectedRows === 1,
    response: {},
  };
};

export default {
  getAllBooks,
  sortBooksByYear,
  getBookById,
  updateBookSQL,
  createBook,
  deleteBook,
  getAnyBookById,
  bookAverageRating,
  getBookByIdForUpdate,
  uploadFile,
};
