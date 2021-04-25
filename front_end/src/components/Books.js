import booksData from '../data/books.js';
import {useState} from 'react';

const Books = () => {
  const [books, setBooks] = useState(booksData);

  return(
    <div id="books">
      <div className="content">
        {books.map((book) => (
          <div id='BookContainer' className='mouse_over'>
            <img src={book.poster} />
            <h2>
              {book.title}
              <br/>
              {book.author}
              <br/>
              ({book.publishing_year})
            </h2>
            <button type="button" className="book-details-link" data-book-id={book.books_id}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Books;
