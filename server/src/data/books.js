const books = [];

let bookId = 1;

export const addBook = (book) => books.push(book);

export const getAllBooks = () => books.filter(book => !book.isDeleted);

export const getBookById = (id) => books.find(book => book.id === id && book.isDeleted === false);

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
    isBorrowed: false,
    isDeleted: false,
    readingCount: 0,
    bookCount: 1,
    bookReservation: false
  })

  return books[books.length - 1];
};

export const deleteBook = (id, author) => {

  const book = getBookById(id);
  book.isDeleted = true;
};