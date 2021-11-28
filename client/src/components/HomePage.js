import {useEffect, useState, useContext} from 'react';
import {Link} from "react-router-dom";
import AuthContext from '../providers/auth-context';
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

  const displayBooks = topBooks.map((book, index) => {
    return (
      <div className="image-container d-flex justify-content-start m-3" key={index}>
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
        <Link to={auth.isLoggedIn ? "/books" : "/login"}>
          <button className="home-page-button">Enter The Library</button>
        </Link>
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
