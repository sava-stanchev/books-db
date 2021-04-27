// import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const Reviews = () => {
  // const {remove, update} = props;
  const [reviews, setReviews] = useState([]);
  // const [updateMode, setModeUpdate] = useState(false);
  // const [viewContent, setViewContent] = useState(content);

  useEffect(() => {

    fetch(`http://localhost:5555/reviews`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setReviews(data))
  }, []);

  // const toggleUpdateMode = () => {
  //   setModeUpdate((prevState) => !prevState);
  // }

  // const saveEdit = () => {
  //   update({content: viewContent});
  //   toggleUpdateMode();
  // }

  const history = useHistory();

  console.log(reviews);
  return(
    <div>
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
            <p>{review.date_created}</p>
            <p>{review.user_name}</p>
            <p>{review.title}</p>
            <button type="button" className="books-details-link" onClick = {() => history.push(`/reviews/${review.reviews_id}`)}>View Details</button>
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
