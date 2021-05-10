import {useEffect, useState, useContext} from 'react';
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import AuthContext from '../providers/authContext';
import {HOST} from '../common/constants.js';

const HomePage = () => {
  const auth = useContext(AuthContext);
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${HOST}/books/random`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
      },    
    })
      .then((response) => response.json())
      .then((data) => setTopBooks(data))
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

  const displayBooks = topBooks.map((book) => {
    return (
      <div className="image-container d-flex justify-content-start m-3">
        <img className="book-cover-size" src={book.posters} alt={book.title} />
        <div className="overlay d-flex align-items-center justify-content-center">
          {book.title}
        </div>
      </div>
    );
  });

  return(
    <div>
      <header className="w3-container w3-center">
      {auth.isLoggedIn ?
        <Button variant="primary" size="lg" onClick = {() => history.push('/books')}>Enter The Library</Button>
      :
        <Button variant="primary" size="lg" onClick = {() => history.push('/login')}>Enter The Library</Button>
      }
      </header>
      <span className="pageTitle">Some of our books:</span>
      {showLoader()}
      {showError()}
      <div className="container-fluid book-app">
        <div className="row">
          {displayBooks}
        </div>
      </div>
    </div>
  )
};

export default HomePage;
