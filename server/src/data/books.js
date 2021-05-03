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

const getBookById = async (bookId) => {
  const sql = `
    SELECT b.books_id, b.title, b.author, b.age_recommendation, b.isbn, b.publishing_year, b.print_length, b.posters, l.language, g.genre, b.is_deleted, b.is_borrowed
    FROM books AS b
    JOIN languages AS l
    ON b.language = l.languages_id
    JOIN genres AS g
    ON b.genre = g.genres_id
    WHERE b.is_deleted != 1 and b.books_id = ?
  `;
  // const sql = `
  //     SELECT b.books_id, b.title, b.author, b.age_recommendation,
  //           b.isbn, b.publishing_year, b.print_length, b.posters,
  //           l.language, g.genre, b.is_deleted, b.is_borrowed, r.rating,
  //           br.users_id, (SELECT ROUND(AVG(r.rating))
  //                         FROM books AS b
  //                         JOIN books_ratings AS br
  //                         ON b.books_id = br.books_id
  //                         JOIN ratings AS r
  //                         ON br.ratings_id = r.ratings_id
  //                         WHERE br.books_id = 2
  //                         ) AS average_rating
  //     FROM books AS b
  //     JOIN languages AS l
  //     ON b.language = l.languages_id
  //     JOIN genres AS g
  //     ON b.genre = g.genres_id
  //     JOIN books_ratings as br
  //     ON b.books_id = br.books_id
  //     JOIN ratings AS r
  //     ON br.ratings_id = r.ratings_id
  //     WHERE b.is_deleted != 1 and b.books_id = ?
  // `;
  const result = await pool.query(sql, [bookId]);
  return result;
};

const getBookByIdForUser = async (id) => {
  const sql = `
  SELECT title, author, genre, age_recommendation, isbn, publishing_year, language, print_length FROM books AS b
  WHERE b.is_deleted != 1 AND b.books_id = ?
`;
  const result = await pool.query(sql, [id]);
  return result[0];
};

const borrowBook = async (id) => {
  const sql = `
  UPDATE books SET books.is_borrowed = 1
  WHERE books.books_id = ?
  AND books.is_borrowed != 1
  `;
  return await pool.query(sql, [id]);
};

const returnBook = async (bookId) => {
  const sql = `
  UPDATE books SET books.is_borrowed = 0
  WHERE books.books_id = ?
  AND books.is_borrowed = 1
  `;
  const varsss = await pool.query(sql, [bookId]);
  console.log(varsss);
  return varsss;
};

const setReturnRecords = async (recordsId) => {
  const sql = `
  UPDATE records AS r SET date_returned = NOW()
  WHERE r.records_id = ?
  `;

  return await pool.query(sql, [recordsId]);
};

const setBorrowRecords = async (bookId, userId) => {
  const sql = `
  INSERT INTO records (users_id, books_id, date_borrowed, date_to_return)
  VALUES (?, ?, NOW(), NOW() + INTERVAL 20 DAY)
  `;

  const result = await pool.query(sql, [userId, bookId]);
  return result;
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

  return await pool.query(sql, [title, author, genre, age_recommendation,
    isbn, publishing_year, language, print_length, books_id]);
};

const createBook = async (book, user) => {
  console.log('+++++++++++');
  const {
    title,
    author,
    genre,
    age_recommendation,
    isbn,
    publishing_year,
    language,
    print_length,
  } = book;
  const {user_id} = user;

  const sqlNewBook = `
      INSERT INTO books (title, author, genre, age_recommendation, isbn, publishing_year, language, print_length, created_by, is_deleted, is_borrowed, book_count, reading_count )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 1, 0)
  `;
  const result = await pool.query(sqlNewBook,
      [title, author, +genre, age_recommendation, isbn, publishing_year, +language, print_length, user_id]);

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
    WHERE r.users_id = ? AND r.books_id = ? AND r.date_returned IS NULL
  `;

  const result = await pool.query(sql, [userId, bookId]);
  return result[0];
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
  getBookByIdForUser,
  isBookBorrowed,
  getAnyBookById,
  setReturnRecords,
  setBorrowRecords,
  bookAverageRating,
};
