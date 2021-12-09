import {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaTrashAlt} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";
import { HOST } from '../common/constants.js';
import AuthContext from '../providers/auth-context';

const SingleBookReviews = ({id}) => {
  const auth = useContext(AuthContext);
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    fetch(`${HOST}/books/${id}/reviews`, { 
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => response.json())
      .then((data) => setReviewsData(data));
  }, [id]);

  
  const deleteReview = (reviewId) => {
    fetch(`${HOST}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then(data => setReviewsData(reviewsData.filter(r => r.reviews_id !== data.reviews_id)));
  };

  const history = useHistory();

  if  (reviewsData === null) {
    return <div className="Loader"></div>;
  }

  return (
    <div className="review-list" style={{marginRight: '15px', marginLeft: '15px'}}>
      <div className="review-header">
        <h5 className="list-title">Reviews for this book:</h5>
      </div>
      <div className="review-body">
        <div className="reviews">
          {reviewsData.map((review) => {
            return (
              <div className="review" key={review.content}>
                <h5>{review.content}</h5>
                <p>by <i>{review.username}</i> on {new Date(review.date_created).toLocaleDateString("en-US")}</p>
                <div>
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
                    :
                    <></>
                  }
                </div>
                <p>------------------</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SingleBookReviews;
