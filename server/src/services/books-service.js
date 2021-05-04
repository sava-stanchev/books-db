import booksData from '../data/books.js';

const updateBook = async (id, bookData) => {
  const book = await booksData.getBookByIdForUpdate(id);
  if (!book) {
    return null;
  }

  const updated = {...book[0], ...bookData};
  const _ = await booksData.updateBookSQL(updated);

  return updated;
};

export default {
  updateBook,
};
