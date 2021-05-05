import {useEffect, useState} from 'react';

const SingleBookReviews = ({id}) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5555/books/${id}/reviews`, { 
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => response.json())
      .then((data) => setReviewsData(data))
      .catch((error) => setError(error.message))
  }, [id]);

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
