import {useEffect, useState} from 'react';
import StarRating from './StarRating';
import {useHistory} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";

const SingleBook = props => {
  const [bookData, setBookData] = useState(null);
  //const [bookRating, setBookRating] = useState(null);
  const [error, setError] = useState(null);
  const {id} = props.match.params;
  //const [hasReview, setHasReview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/books/${id}`, { 
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => response.json())
      .then((data) => setBookData(data[0]))
      .catch((error) => setError(error.message))
  }, [id]);

  const borrowBook = () => {
    fetch(`http://localhost:5555/books/${id}`, { 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .catch((error) => setError(error.message));
  };

  // rating
  // useEffect(() => {
  //   fetch(`http://localhost:5555/books/${id}/rating`, { 
  //     method: 'PUT',
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setBookRating(data[0]))
  //     .catch((error) => setError(error.message))
  // }, [id])

  // update
  // useEffect(() => {
  //   fetch(`http://localhost:5555/books/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${localStorage.getItem('token')}`
  //     },
  //   })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     try {
  //       console.log({res});
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   })
  // }, [id]);

  const deleteBook = () => {
    fetch(`http://localhost:5555/books/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .catch((error) => setError(error.message))
    .then(() => history.push(`/books`));
  };

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  const history = useHistory();

  if  (bookData === null) {
    return <div className="Loader"></div>;
  }

  return(
    <div id="book">
      {showError()}
      <div className="content">
        <div id="book-detailed">
          <Row>
            <Col>
              <img src={bookData.posters} alt={bookData.title}/>
            </Col>
            <Col>
              <div id="book-info">
                <p>Title: {bookData.title}</p>
                <p>Author: {bookData.author}</p>
                <p>Year: {bookData.publishing_year}</p>
                <p>Genre: {bookData.genre}</p>
                <p>Language: {bookData.language}</p>
                <p>Age Recommendation: {bookData.age_recommendation}</p>
                <p>Print Length: {bookData.print_length}</p>
                <p>ISBN: {bookData.isbn}</p>
                <p>Book Rating: <StarRating bookData={bookData}/></p>
              </div>
            </Col>
            <Col>
              <br/>
              <p>Would you like to borrow the book?</p>
              <Button variant="primary" onClick={() => borrowBook()}>
                Borrow!
              </Button>
              <br/>
              <br/>
              <p>Would you like to leave a review?</p>
              <Button variant="primary" onClick={() => history.push(`/books/${bookData.books_id}/create-review`)}>
                Create Review
              </Button>
              <br/>
              <br/>
              <p>__________________________</p>
              <br/>
              <Button variant="primary">
                Update Book
              </Button>
              <br/>
              <br/>
              <Button variant="danger" onClick={() => deleteBook()}>
                Delete Book
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
};

export default SingleBook;
