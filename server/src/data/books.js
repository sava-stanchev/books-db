const books = [];

let booksId = 1;

export const addBook = (book) => books.push(book);

export const getAllBooks = () => books;

export const getBookById = (id) => books.find(book => book.id === id);

export const updateBook = (id, bookUpdate) => {
  const book = getBookById(id);

  Object.keys(bookUpdate).forEach(key => book[key] = bookUpdate[key]);

};

export const createBook = (book) => {
  books.push({
    ...book,
    id: booksId++,
    isBorrowed: false,
    isDeleted: false,
    readingCount: 0,
    bookCount: 1,
    bookReservation: false
  })
}