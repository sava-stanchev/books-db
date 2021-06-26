import {Jumbotron} from 'react-bootstrap';
import UpdateReviewForm from './UpdateReviewForm';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { HOST } from '../common/constants.js';

const UpdateReview = () => {
  const history = useHistory();
  const reviewId = history.location.pathname.split('/')[2];
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${HOST}/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then((data) => setReview(data))
    .catch((error) => setError(error.message));
  }, [reviewId]);

  if  (review === null) {
    return <div className="Loader"></div>;
  }

  console.log('Update review');
  const updateReviewProps = (prop, value) => {
    setReview({
      ...review,
      [prop]: value,
    });
  };

  const updateReview = () => {
    fetch(`${HOST}/reviews/${reviewId}/update`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(review),
    })
    .then((res) => res.json())
    .then(() => history.goBack());
  };

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  return(
    <>
    <div>
      {showError()}
    </div>
    <div className="login-page-bg-info">
      <Jumbotron className="form-box">
        <UpdateReviewForm updateReviewProps={updateReviewProps} review={review} updateReview={updateReview}/>
      </Jumbotron>
    </div>
    </>
  )
};

export default UpdateReview;
