import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5555/books`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  const Loader = () => <div className="Loader"></div>;

  const showLoader = () => {
    if (loading) {
      return <Loader />
    }
  }

  const history = useHistory();

  return(
    <div id="books">
      {showLoader()}
      {showError()}
      <div className="content">
        {books.map((book) => (
          <div id='BookContainer' className='mouse_over'>
            <img src={book.posters} />
            <h2>
              {book.title}
              <br/>
              {book.author}
              <br/>
              {book.publishing_year}
            </h2>
            <button type="button" className="book-details-link" onClick = {() => history.push(`/books/${book.books_id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Books;
