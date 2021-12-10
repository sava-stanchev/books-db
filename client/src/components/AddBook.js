import AddBookForm from './AddBookForm';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { HOST } from '../common/constants.js'

const AddBook = () => {
  const history = useHistory();
  const routeChange = () =>{ 
    const path = `/books`; 
    history.push(path);
  };

  const [genres, setGenres] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(`${HOST}/genres`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setGenres(data))
    .then(setLoading(false))
    .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${HOST}/languages`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setLanguages(data))
    .then(setLoading(false))
    .catch((error) => setError(error.message));
  }, []);

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    age_recommendation: '',
    isbn: '',
    publishing_year: '',
    language: '',
    posters: '',
    print_length: '',
  });
  
  const updateBook = (prop, value) => {
    setBook({
      ...book,
      [prop]: value,
    });
  };
  
  const addBook = () => {
    setLoading(true);
    fetch(`${HOST}/books/create`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(book),
    })
    .then((res) => res.json())
    .then(() => routeChange())
    .then(setLoading(false));
  };

  if (loading) {
    return <div>Loading...</div>
  }

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
      <AddBookForm genres = {genres} languages={languages} updateBook={updateBook} book={book} addBook={addBook}/>
    </>
  )
};

export default AddBook;
