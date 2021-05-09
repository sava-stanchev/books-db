import {useEffect, useState, useContext} from 'react';
import StarRating from './StarRating';
import {useHistory} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import SingleBookReviews from './SingleBookReviews';
import AuthContext from '../providers/authContext';
import { HOST } from '../common/constants.js';

const SingleBook = props => {
  const auth = useContext(AuthContext);
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const {id} = props.match.params;
  const [review, setReview] = useState(null);
  const userId = {'userId': auth.user.users_id};
  
  useEffect(() => {
    fetch(`${HOST}/reviews/${id}`, { 
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body:JSON.stringify(userId),
    })
    .then((response) => response.json())
    .then((data) => setReview(data))
    .catch((error) => setError(error.message))
  }, [bookData]);

  useEffect(() => {
    fetch(`${HOST}/books/${id}`, { 
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
    fetch(`${HOST}/books/${id}`, { 
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then((data) => setBookData(data[0]))
    .catch((error) => setError(error.message));
  };

  const returnBook = () => {
    fetch(`${HOST}/books/${id}`, { 
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then((data) => setBookData(data[0]))
    .catch((error) => setError(error.message));
  };

  const deleteBook = () => {
    fetch(`${HOST}/books/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then(() => history.push(`/books`))
    .catch((error) => setError(error.message));
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
                {auth.user.is_admin?
                  <>
                    <Button variant="primary" onClick={() => history.push(`/books/${bookData.books_id}/update`)}>
                      Update Book
                    </Button>
                    <Button variant="danger" onClick={() => deleteBook()}>
                      Delete Book
                    </Button>
                  </>
                  :<></>
                } 
              </div>
            </Col>
            <Col>
              <br/>
              {bookData.is_borrowed
                ? 
                <>
                  <p>Book is already borrowed!</p>
                  <Button variant="primary" onClick={() => returnBook()}>
                    Return!
                  </Button>
                </>
                :
                <>
                  <p>Would you like to borrow the book?</p>
                  <Button variant="primary" onClick={() => borrowBook()}>
                    Borrow!
                  </Button>
                </>
              }
              <br/>
              <br/>
                {
                  review
                  ?
                  <></>
                  :
                  <>
                    <p>Would you like to leave a review?</p>
                    <Button variant="primary" onClick={() => history.push(`/books/${bookData.books_id}/create-review`)}>
                      Create Review
                    </Button>
                  </>
                }
              <br/>
              <p>__________________________</p>
              <SingleBookReviews id={id} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
};

export default SingleBook;
