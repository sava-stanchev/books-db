import {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaTrashAlt} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";
import {FaThumbsUp} from "react-icons/fa";
import {FaThumbsDown} from "react-icons/fa";
import { HOST } from '../common/constants.js';
import AuthContext from '../providers/authContext';

const SingleBookReviews = ({id}) => {
  const auth = useContext(AuthContext);
  const [reviewsData, setReviewsData] = useState([]);
  const [error, setError] = useState(null);
  console.log(reviewsData);

  useEffect(() => {
    fetch(`${HOST}/books/${id}/reviews`, { 
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
    fetch(`${HOST}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then(data => setReviewsData(reviewsData.filter(r => r.reviews_id !== data.reviews_id)))
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
    <div className="review-list">
      <div className="review-header">
        <h5 className="list-title">Reviews for this book:</h5>
      </div>
      <div className="review-body">
        <div className="reviews">
          {reviewsData.map((review) => {
            return (
              <>
                <div className="review">
                  <h6>{review.content}</h6>
                  <p>by <i>{review.user_name}</i> on {new Date(review.date_created).toLocaleDateString("en-US")}</p>
                  <div>
                    {
                      auth.user.users_id===review.users_id
                      ?
                      <></>
                      :
                      <>
                        <Button variant="warning" className="reviewBtns">
                          <FaThumbsUp/>
                        </Button>
                        <Button variant="warning" className="reviewBtns">
                          <FaThumbsDown/>
                        </Button>
                      </>
                      
                    }
                    {
                      auth.user.users_id===review.users_id
                      ?
                      <>
                        <Button variant="primary" className="reviewBtns" onClick={() => history.push(`/reviews/${review.reviews_id}/update`)}>
                          <FaEdit/>
                        </Button>
                        <Button variant="danger" className="reviewBtns" onClick={() => deleteReview(review.reviews_id)}>
                          <FaTrashAlt/>
                        </Button>
                      </>
                      :<></>
                    }
                  </div>
                  <p>------------------</p>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SingleBookReviews;
