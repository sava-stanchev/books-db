import pool from "./pool.js";

const books = [];

let bookId = 1;

const addBook = (book) => books.push(book);

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
  return await pool.query(`
    SELECT * FROM books b
    WHERE b.is_deleted != 1 AND b.books_id = '${id}'
  `);  
};

const borrowBook = async (id) => {
  return await pool.query(`
    UPDATE books SET
    books.is_borrowed = 1
    WHERE books.books_id = '${id}'
    AND books.is_borrowed != 1
  `);
};

const updateBookSQL = async (book) => {
  const { books_id, title, author, genre, age_recommendation,
          isbn, publishing_year, language, print_length } = book;
  
  const sql = `
      UPDATE books SET
        title = ?,
        author = ?,
        genre = ?,
        age_recommendation = ?,
        isbn = ?,
        publishing_year = ?,
        language = ?,
        print_length = ?
      WHERE books_id = ?
  `;

  return await pool.query(sql, [books_id, title, author, genre, age_recommendation,
                                isbn, publishing_year, language, print_length]);
}

const createBook = (book, createdBy) => {
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

const deleteBook = async (id) => {
  return await pool.query(`
    UPDATE books SET
    books.is_deleted = 1
    WHERE books.books_id = '${id}'
  `);
};

export default {
  addBook,
  getAllBooks,
  searchBooksByTitle,
  sortBooksByYear,
  getBookById,
  borrowBook,
  updateBookSQL,
  createBook,
  deleteBook
}
