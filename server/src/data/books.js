import pool from "./pool.js";


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
  return await pool.query(`
    UPDATE books SET
    books.is_borrowed = 1
    WHERE books.books_id = '${id}'
    AND books.is_borrowed != 1
  `);
};

const returnBook = async (id) => {
  return await pool.query(`
    UPDATE books SET
    books.is_borrowed = 0
    WHERE books.books_id = '${id}'
    AND books.is_borrowed = 1
  `);
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
    print_length
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
    isbn, publishing_year, language, print_length, books_id
  ]);
}

const createBook = async (book, user) => {
  const {
    title,
    author,
    genre,
    age_recommendation,
    isbn,
    publishing_year,
    language,
    print_length
  } = book;
  console.log(book);
  const {
    user_id,
    user_name,
    is_admin
  } = user;

  const sqlNewBook = `
      INSERT INTO books (title, author, genre, age_recommendation, isbn, publishing_year, language, print_length, created_by, is_deleted, is_borrowed, book_count, reading_count )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 1, 0)
`;
  const result = await pool.query(sqlNewBook, [title, author, +genre, age_recommendation, isbn, publishing_year, +language, print_length, user_id]);

  const sql = `SELECT * FROM books AS b
              WHERE b.books_id = ?
`;
  const createdBook = (await pool.query(sql, [result.insertId]))[0];

  return {
    success: true,
    response: createdBook
  };
};

const deleteBook = async (id) => {
  return await pool.query(`
    UPDATE books SET
    books.is_deleted = 1
    WHERE books.books_id = '${id}'
  `);
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
  returnBook
}