import {useEffect, useState} from 'react';
import StarRating from './StarRating';

const SingleBook = props => {
  const [bookData, setBookData] = useState(null);
  // const [bookRating, setBookRating] = useState(null);
  const [error, setError] = useState(null);
  const {id} = props.match.params;

  useEffect(() => {
    fetch(`http://localhost:5555/books/${id}`, { 
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setBookData(data[0]))
      .catch((error) => setError(error.message))
  }, [id]);

  // useEffect(() => {
  //   fetch(`http://localhost:5555/books/${id}/rating`, { 
  //     method: 'PUT',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setBookRating(data[0]))
  //     .catch((error) => setError(error.message))
  // }, [id])

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  if  (bookData === null) {
    return <div className="Loader"></div>;
  }

  return(
    <div id="book">
      {showError()}
      <div className="content">
        <div id="book-detailed">
          <img src={bookData.posters} alt={bookData.title}/>
          <div id="book-info">
            <p>Title: {bookData.title}</p>
            <p>Author: {bookData.author}</p>
            <p>Year: {bookData.publishing_year}</p>
            <p>Genre: {bookData.genre}</p>
            <p>Language: {bookData.language}</p>
            <p>Age Recommendation: {bookData.age_recommendation}</p>
            <p>Print Length: {bookData.print_length}</p>
            <p>ISBN: {bookData.isbn}</p>
            <p>Book Rating: <StarRating /></p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SingleBook;
