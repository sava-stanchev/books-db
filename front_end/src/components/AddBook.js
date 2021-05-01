import {Jumbotron} from 'react-bootstrap';
import AddBookForm from './AddBookForm';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

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
    fetch(`http://localhost:5555/genres`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setGenres(data));
   // .catch((error) => setError(error.message))
   // .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5555/languages`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => setLanguages(data));
   // .catch((error) => setError(error.message))
   // .finally(() => setLoading(false));
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
  
  console.log(book);
  const updateBook = (prop, value) => {
    setBook({
      ...book,
      [prop]: value,
    });
  };
  
  const addBook = () => {
    fetch('http://localhost:5555/books/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(book),
    })
    .then((res) => res.json())
    .then((res) => {
      try {
        console.log({res});
      } catch (error) {
        console.warn(error);
      }
    })
    .then(()=>routeChange());
  };

  if (genres === null || languages === null) {
    return <div>Loading...</div>
  }

  return(
    <div className="registration-page-bg-info">
      <Jumbotron className="form-box">
        <AddBookForm genres = {genres} languages={languages} updateBook={updateBook} book={book} addBook={addBook}/>
      </Jumbotron>
    </div>
  )
};

export default AddBook;
