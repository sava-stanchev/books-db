import {Jumbotron} from 'react-bootstrap';
import {useState} from 'react';
import {useHistory} from "react-router-dom";
import AddReviewForm from './AddReviewForm';
import { HOST } from '../common/constants.js';


const AddReview = () => {
  const history = useHistory();
  const routeChange = () =>{ 
    const path = `/books/${bookId}`; 
    history.push(path);
  };

  const [review, setReview] = useState({
    content: '',
  });
  
  const bookId = history.location.pathname.split('/')[2];

  const updateReview = (prop, value) => {
    setReview({
      ...review,
      [prop]: value,
    });
  };

  const addReview = () => {
    fetch(`${HOST}/books/${bookId}/create-review`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(review),
    })
    .then((res) => res.json())
    .then((res) => {
      try {
        console.log({res});
      } catch (error) {
        console.warn(error);
      }
    })
    .then(() => routeChange());
  };

  return(
    <div className="login-page-bg-info">
      <Jumbotron className="form-box">
        <AddReviewForm updateReview={updateReview} review={review} addReview={addReview}/>
      </Jumbotron>
    </div>
  )
};

export default AddReview;
