import booksData from '../data/books.js'

const updateBook = async (id, bookData) => {
    const book = await booksData.getAllBooks(id);
    if (!book) {
      return null;
    }
  
    const updated = { ...book, ...bookData };
    const _ = await booksData.updateBookSQL(updated);
  
    return updated;
};

export default {
    updateBook
}
