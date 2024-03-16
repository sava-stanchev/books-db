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
      ORDER BY b.publishing_year
    `);
  }

  if (sort === "year_desc") {
    return await pool.query(`
      SELECT * FROM books b
      WHERE b.is_deleted != 1
      ORDER BY b.publishing_year DESC
    `);
  }
};

const getBookById = async (bookId) => {
  const sql = `
    SELECT b.books_id, b.title, b.author, b.year, b.posters, l.language, g.genre, b.is_deleted
    , (SELECT ROUND(AVG(r.rating), 2)
        FROM books AS b
        JOIN books_ratings AS br
        ON b.books_id = br.books_id
        JOIN ratings AS r
        ON br.ratings_id = r.ratings_id
        WHERE br.books_id = ?
        ) AS average_rating
    FROM books AS b
    JOIN languages AS l
    ON b.language = l.languages_id
    JOIN genres AS g
    ON b.genre = g.genres_id
    WHERE b.is_deleted != 1 and b.books_id = ?
  `;

  const result = await pool.query(sql, [bookId, bookId]);
  return result;
};

const getBookByIdForUpdate = async (id) => {
  const sql = `
  SELECT b.title, b.author,b.age_recommendation, b.genre, b.isbn, b.publishing_year, b.language, b.print_length
  FROM books AS b
  WHERE b.is_deleted != 1 AND b.books_id = ?
`;
  const result = await pool.query(sql, [id]);

  return result[0];
};

const updateBookSQL = async (book) => {
  const {
    books_id,
    title,
    author,
    genre,
    age_recommendation,
    isbn,
    publishing_year,
    language,
    print_length,
  } = book;

  const sql = `
    UPDATE books AS b SET
      b.title = ?,
      b.author = ?,
      b.genre = ?,
      b.age_recommendation = ?,
      b.isbn = ?,
      b.publishing_year = ?,
      b.language = ?,
      b.print_length = ?
    WHERE b.books_id = ?
  `;

  return await pool.query(sql, [
    title,
    author,
    genre,
    age_recommendation,
    isbn,
    publishing_year,
    language,
    print_length,
    books_id,
  ]);
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

  const sql = `SELECT * FROM books AS b WHERE b.books_id = ?`;
  const createdBook = (await pool.query(sql, [result.insertId]))[0];

  return {
    success: true,
    response: createdBook,
  };
};

const deleteBook = async (id) => {
  const sql = `
    UPDATE books SET books.is_deleted = 1
    WHERE books.books_id = ?
  `;
  return await pool.query(sql, [id]);
};

const getAnyBookById = async (id) => {
  const sql = `
    SELECT * FROM books AS b
    WHERE b.books_id = ?
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
  const sql = `UPDATE books AS b SET b.posters = ? WHERE b.books_id = ?`;
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
