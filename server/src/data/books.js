import pool from "./pool.js";

const books = [];

let bookId = 1;

export const addBook = (book) => books.push(book);

export const getAllBooks = async () => {
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1
  `);
};

export const searchBooksByTitle = async (title) => {
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1 AND b.title
    LIKE '%${pool.escape(title).replace(/'/g, '')}%'
  `);
};

export const sortBooksByYear = async (sort) => {
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

export const getBookById = async (id) => {
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1 AND b.books_id = '${id}'
  `);  
};

export const getReviews = async (id) => {
  return await pool.query(`
    SELECT content FROM books b
    JOIN reviews r
      ON b.title = r.book_title
      WHERE b.is_deleted != 1 AND b.books_id = '${id}'
  `);
};

export const borrowBook = async (id) => {
  return await pool.query(`
    UPDATE books SET
    books.is_borrowed = 1
    WHERE books.books_id = '${id}'
    AND books.is_borrowed != 1
  `);
};

export const updateBook = (id, bookUpdate) => {
  const book = getBookById(id);
  if (book) {
    Object.keys(bookUpdate).forEach(key => book[key] = bookUpdate[key]);
  }
};

export const createBook = (book, createdBy) => {
  books.push({
    ...book,
    id: bookId++,
    createdBy: createdBy,
    isDeleted: false,
    isBorrowed: false,
    readingCount: 0,
    bookReservation: false,
    bookCount: 1
  })

  return books[books.length - 1];
};

export const deleteBook = async (id) => {
  return await pool.query(`
    UPDATE books SET
    books.is_deleted = 1
    WHERE books.books_id = '${id}'
  `);
};
