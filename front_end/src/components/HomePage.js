import {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";

const HomePage = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5555/books`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
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

  const displayBooks = topBooks.map((book) => {
    return (
      <div className="image-container d-flex justify-content-start m-3">
        <img src={book.posters} alt={book.title} style={{maxHeight: 300}}/>
        <div className="overlay d-flex align-items-center justify-content-center">
          {book.title}
        </div>
      </div>
    );
  });

  return(
    <div>
      <header className="w3-container w3-center">
        <Button variant="primary">Enter The Library</Button>
      </header>
      <span className="pageTitle">Top 10 Books in The Library</span>
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
