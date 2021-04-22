import booksData from '../data/books.js';
import {useState} from 'react';

const Books = () => {
  const [books, setBooks] = useState(booksData);

  return(
    <div className="App">
      {books.map((book) => (
        <div>
          Title: {book.title}, Author: {book.author}, Genre: {book.genre}, 
          Age Recommendation {book.age_recommendation}, ISBN: {book.isbn},
          Publishing Year: {book.publishing_year}, Language: {book.language},
          Print Length: {book.print_length}
        </div>
      ))}
    </div>
  )
};

export default Books;
