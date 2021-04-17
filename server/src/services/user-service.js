import booksData from '../data/books.js';
import usersData from '../data/users.js';

const createUsers = async (userData) => {
  
  if (getUserByName())

};

const updateBook = async (id, bookData) => {
    const book = await booksData.getBookById(id);
    if (!book) {
      return null;
    }
  
    const updated = { ...book[0], ...bookData };
    const _ = await booksData.updateBookSQL(updated);
  
    return updated;
};

export default {
    updateBook
}
