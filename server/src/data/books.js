import pool from './pool.js';


const getAllBooks = async () => {
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1
  `);
};

const searchBooksByTitle = async (title) => {
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1 AND b.title
    LIKE '%${pool.escape(title).replace(/'/g, '')}%'
  `);
};

const sortBooksByYear = async (sort) => {
  if (sort === 'year_asc') {
    return await pool.query(`
      SELECT * FROM books b
      WHERE b.is_deleted != 1
      ORDER BY b.publishing_year
    `);
  }

  if (sort === 'year_desc') {
    return await pool.query(`
      SELECT * FROM books b
      WHERE b.is_deleted != 1
      ORDER BY b.publishing_year DESC
    `);
  }
};

const getBookById = async (id) => {
  const sql = `
  SELECT * FROM books AS b
  WHERE b.is_deleted != 1 AND b.books_id = ?
`;
  const result = await pool.query(sql, [id]);
  return result;
};

const borrowBook = async (id) => {
  const sql = `
  UPDATE books SET books.is_borrowed = 1
  WHERE books.books_id = ?
  AND books.is_borrowed != 1
  `;
  return await pool.query(sql, [id]);
};

const returnBook = async (id) => {
  const sql = `
  UPDATE books SET books.is_borrowed = 0
  WHERE books.books_id = ?
  AND books.is_borrowed = 1
  `;
  return await pool.query(sql, [id]);
};

const updateBookSQL = async (book) => {
  const {
    booksId,
    title,
    author,
    genre,
    ageRecommendation,
    isbn,
    publishingYear,
    language,
    printLength
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

  return await pool.query(sql, [title, author, genre, ageRecommendation,
    isbn, publishingYear, language, printLength, booksId
  ]);
}

const createBook = async (book, user) => {
  const {
    title,
    author,
    genre,
    ageRecommendation,
    isbn,
    publishingYear,
    language,
    printLength,
  } = book;
  const {
    userId,
    userName,
    isAdmin,
  } = user;

  const sqlNewBook = `
      INSERT INTO books (title, author, genre, age_recommendation, isbn, publishing_year, language, print_length, created_by, is_deleted, is_borrowed, book_count, reading_count )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 1, 0)
`;
  const result = await pool.query(sqlNewBook,
    // eslint-disable-next-line max-len
    [title, author, +genre, ageRecommendation, isbn, publishingYear, +language, printLength, userId]);

  const sql = `SELECT * FROM books AS b
              WHERE b.books_id = ?
`;
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

const isBookBorrowedAndReturned = async (bookId, userId) => {
  const sql = `
  SELECT * FROM records AS r
  WHERE r.users_id = ? AND r.books_id =? AND r.date_returned IS NOT NULL
  `;

  const result = await pool.query(sql, [userId, bookId]);
  return result[0];
};

const isBookBorrowed = async (bookId, userId) => {
  const sql = `
  SELECT * FROM records AS r
  WHERE r.users_id = ? AND r.books_id =?
  `;

  const result = await pool.query(sql, [userId, bookId]);
  return result[0];
};

export default {
  getAllBooks,
  searchBooksByTitle,
  sortBooksByYear,
  getBookById,
  borrowBook,
  updateBookSQL,
  createBook,
  deleteBook,
  returnBook,
  isBookBorrowedAndReturned,
  isBookBorrowed,
}
