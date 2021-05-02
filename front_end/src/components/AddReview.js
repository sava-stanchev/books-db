import {Jumbotron} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import AddReviewForm from './AddReviewForm';

const AddReview = () => {
  const history = useHistory();
  const routeChange = () =>{ 
    const path = `/reviews`; 
    history.push(path);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [review, setReview] = useState({
    content: '',
  });
  
  console.log(review);
  const updateReview = (prop, value) => {
    setReview({
      ...review,
      [prop]: value,
    });
  };

  const addReview = () => {
    fetch('http://localhost:5555/books/:id/create-review', {
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
