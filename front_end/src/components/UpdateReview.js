import {Jumbotron} from 'react-bootstrap';
import UpdateReviewForm from './UpdateReviewForm';
import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

const UpdateReview = () => {
  const history = useHistory();
  const reviewId = history.location.pathname.split('/')[2];

  useEffect(() => {
    fetch(`http://localhost:5555/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then((data) => setReview(data[0]));
  }, []);

  const [review, setReview] = useState(null);

  if  (review === null) {
    return <div className="Loader"></div>;
  }

  const updateReviewProps = (prop, value) => {
    setReview({
      ...review,
      [prop]: value,
    });
  };

  const updateReview = () => {
    fetch(`http://localhost:5555/reviews/${reviewId}/update`, {
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

  return(
    <div className="login-page-bg-info">
      <Jumbotron className="form-box">
        <UpdateReviewForm updateReviewProps={updateReviewProps} review={review} updateReview={updateReview}/>
      </Jumbotron>
    </div>
  )
};

export default UpdateReview;
