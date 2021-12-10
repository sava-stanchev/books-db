import UpdateBookForm from './UpdateBookForm';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {HOST} from '../common/constants.js';

const UpdateBook = () => {
  const history = useHistory();
  const routeChange = () =>{ 
    const path = `/books/${bookId}`; 
    history.push(path);
  };

  const bookId = history.location.pathname.split('/')[2];
  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`${HOST}/genres`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setGenres(data))
    .catch((error) => setError(error.message))
  }, []);

  useEffect(() => {
    fetch(`${HOST}/languages`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setLanguages(data))
    .catch((error) => setError(error.message))
  }, []);

  useEffect(() => {
    fetch(`${HOST}/books/${bookId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then((data) => setBook(data[0]));
  }, [bookId]);

  const [book, setBook] = useState(null);

  if  (book === null) {
    return <div className="Loader"></div>;
  }

  const updateBookProps = (prop, value) => {
    setBook({
      ...book,
      [prop]: value,
    });
  };

  const updateBook = () => {
    fetch(`${HOST}/books/${bookId}/update`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(book),
    })
    .then((res) => res.json())
    .then(() => routeChange());
  };

  if (genres === null || languages === null) {
    return <div>Loading...</div>
  }

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  return(
    <>
      {showError()}
      <UpdateBookForm genres = {genres} languages={languages} updateBookProps={updateBookProps} book={book} updateBook={updateBook}/>
    </>
  )
};

export default UpdateBook;
