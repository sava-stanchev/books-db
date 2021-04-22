import booksData from '../data/books.js';
import {useState} from 'react';

const SingleBook = () => {
  const [books, setBooks] = useState(booksData);

  return(
    <div className="App">
      {books.map((book) => (
        <div id="book">
          <h1>Title: {book.title}, Author: {book.author}</h1>
          <div className="content-detailed">
            <div className="book-detailed">
              <div className="book-image-detailed">
                <img src="${book.images.original.url}"/>
              </div>
              <div className="book-info">
                <p>Publishing Year: {book.publishing_year}</p>
                <p>Genre: {book.genre}</p>
                <p>Age Recommendation: {book.age_recommendation}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Language: {book.language}</p>
                <p>Print Length: {book.print_length}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default SingleBook;