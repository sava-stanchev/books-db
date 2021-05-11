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
  const [total, setTotalData] = useState(null);
  

  
  console.log(reviewsData);
  console.log(total);

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

  const updateLike = (reviewLikesId, reviews_id) => {
    const reviewsId = {reviews_id};
    const bookId = {books_id: id};
    fetch(`${HOST}/reviews/${reviewLikesId}/like`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify([reviewsId, bookId])
    })
    .then((res) => res.json())
    .then(data => setReviewsData(data))
    .catch((error) => setError(error.message));
  };

  const updateDislike = (reviewLikesId, reviews_id) => {
    const reviewsId = {reviews_id};
    const bookId = {books_id: id};
    fetch(`${HOST}/reviews/${reviewLikesId}/dislike`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify([reviewsId, bookId])
    })
    .then((res) => res.json())
    .then(data => setTotalData(data))
    .catch((error) => setError(error.message));
  };

  useEffect((reviewId) =>{
    fetch(`${HOST}/reviews/${reviewId}/total`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then(data => setTotalData(data))
    .catch((error) => setError(error.message));
  }, [reviewsData]);

  const reactionsByReview = (review) => {
    fetch(`${HOST}/likes/${review.reviews_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => res.json())
    .then(data => {return data})
    .catch((error) => setError(error.message));
  }

  const history = useHistory();

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  if  (reviewsData === null ) { //|| total === null
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
            const reaction = reactionsByReview(review);
            console.log(reaction);
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
                          review.review_likes_id === null?
                            <>
                              <Button variant="warning" className="reviewBtns" onClick={() => updateLike(review.review_likes_id, review.reviews_id)}>
                                <FaThumbsUp/>
                              </Button>
                              <Button variant="warning" className="reviewBtns" onClick={() => updateDislike(review.review_likes_id, review.reviews_id)}>
                                <FaThumbsDown/>
                              </Button>
                            </>
                            :
                              review.likes === 1?
                              <>
                                <p style={{fontSize: 14}}>You liked this review. <br/>Did you change your mind?</p>
                                <Button variant="warning" className="reviewBtns" onClick={() => updateDislike(review.review_likes_id, review.reviews_id)}>
                                  <FaThumbsDown/>
                                </Button>
                              </>
                              :
                              <>
                                <p style={{fontSize: 14}}>You disliked this review. <br/>Did you change your mind?</p>
                                <Button variant="warning" className="reviewBtns" onClick={() => updateLike(review.review_likes_id, review.reviews_id)}>
                                  <FaThumbsUp/>
                                </Button>
                              </>                     
                    }
                    <p>Likes: {review.total_likes?review.total_likes:0} / Dislikes: {review.total_dislikes?review.total_dislikes:0}</p>
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
