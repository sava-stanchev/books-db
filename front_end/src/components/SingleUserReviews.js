import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaTrashAlt} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";

const SingleUserReviews = ({userId}) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5555/profile/${userId}/reviews`, { 
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => response.json())
      .then((data) => setReviewsData(data))
      .catch((error) => setError(error.message))
  }, []);

  const deleteReview = (reviewId) => {
    fetch(`http://localhost:5555/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then(() => history.go(0))
    .catch((error) => setError(error.message));
  };

  const history = useHistory();

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  if  (reviewsData === null) {
    return <div className="Loader"></div>;
  }

  return (
    <div className="review-list-profile-container">
      {showError()}
      <div className="review-list-profile">
        <div className="review-header">
          <h5 className="list-title">My Reviews:</h5>
        </div>
        <div className="review-body-profile">
          <div className="reviews">
            {reviewsData.map((review) => {
              return (
                <div className="review">
                  <h6>{review.content}</h6>
                  <p>by <i>{review.user_name}</i> on {new Date(review.date_created).toLocaleDateString("en-US")} for {review.title}</p>
                  <div>
                    <Button variant="primary" onClick={() => history.push(`/reviews/${review.reviews_id}/update`)}>
                      <FaEdit/>
                    </Button>
                    <Button variant="danger" onClick={() => deleteReview(review.reviews_id)}>
                      <FaTrashAlt/>
                    </Button>
                  </div>
                  <p>------------------</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleUserReviews;
