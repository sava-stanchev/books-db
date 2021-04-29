// import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const Reviews = () => {
  // const {remove, update} = props;
  const [reviews, setReviews] = useState([]);
  // const [updateMode, setModeUpdate] = useState(false);
  // const [viewContent, setViewContent] = useState(content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5555/reviews`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  // const toggleUpdateMode = () => {
  //   setModeUpdate((prevState) => !prevState);
  // }

  // const saveEdit = () => {
  //   update({content: viewContent});
  //   toggleUpdateMode();
  // }

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  const Loader = () => <div className="Loader"></div>;

  const showLoader = () => {
    if (loading) {
      return <Loader />
    }
  }

  const history = useHistory();

  console.log(reviews);
  return(
    <div>
      {showLoader()}
      {showError()}
      {/* {updateMode ? (
        <input
          value={viewContent}
          onChange={(ev) => setViewContent(ev.target.value)}
        />
      ) : (
        <p>{viewContent}</p>
      )} */}

      {reviews.map((review) => (
        <div id="reviews">
          <div className="content">
            <p>{review.content}</p>
            <p>{new Date(review.date_created).toLocaleDateString("en-US")}</p>
            <p>{review.user_name}</p>
            <p>{review.title}</p>
            <button type="button" className="review-details-link" onClick = {() => history.push(`/reviews/${review.reviews_id}`)}>View Details</button>
          </div>
        </div>
      ))}

      {/* {updateMode ? (
        <Button variant="success" onClick={saveEdit}>Save</Button>
      ) : (
        <Button variant="warning" onClick={toggleUpdateMode}>Edit</Button>
      )}

      <Button variant="danger" onClick={remove}>Delete</Button> */}
    </div>
  )
};

// Reviews.propTypes = {
//   reviews_id: PropTypes.number.isRequired,
//   content: PropTypes.string.isRequired,
//   date_created: PropTypes.string.isRequired,
// }

export default Reviews;
