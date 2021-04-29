import {useEffect, useState} from 'react';

const SingleReview = props => {
  const [reviewData, setReviewData] = useState(null);
  const [error, setError] = useState(null);
  const {reviews_id} = props.match.params;

  useEffect(() => {
    fetch(`http://localhost:5555/reviews/${reviews_id}`, { 
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setReviewData(data[0]))
      .catch((error) => setError(error.message))
  }, [reviews_id]);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  if (reviewData === null) {
    return <div className="Loader"></div>;
  }

  return(
    <div id="review">
      {showError()}
      <p>{reviewData.content}</p>
      <p>{new Date(reviewData.date_created).toLocaleDateString("en-US")}</p>
      <p>{reviewData.user_name}</p>
      <p>{reviewData.title}</p>
    </div>
  )
};

export default SingleReview;
